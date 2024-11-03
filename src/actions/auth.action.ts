"use server";

import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/token";
import { AppError, AUTH_ERRORS } from "@/lib/errors";
import { z } from "zod";
import { ApiResponse } from "@/types/common.type";
import { prisma } from "@/db/prisma";
import { createApiResponse } from "@/services/api";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { signUpSchema } from "@/schemas/auth.schema";

export async function register(
  rawData: z.infer<typeof signUpSchema>
): Promise<ApiResponse<{ userId: string } | null>> {
  try {
    const validatedData = signUpSchema.parse(rawData);
    const { email, password, name } = validatedData;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw AUTH_ERRORS.EMAIL_EXISTS;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const verificationToken = generateVerificationToken();

    const { user } = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      await prisma.verificationToken.create({
        data: {
          identifier: email,
          token: verificationToken,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      return { user };
    });

    await sendVerificationEmail(email, verificationToken).catch((error) => {
      console.error("Failed to send verification email:", error);
    });

    return createApiResponse({ userId: user.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiResponse(
        null,
        new AppError("VALIDATION_ERROR", error.errors[0].message)
      );
    }

    if (error instanceof AppError) {
      return createApiResponse(null, error);
    }

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return createApiResponse(null, AUTH_ERRORS.EMAIL_EXISTS);
      }
    }

    console.error("Registration error:", error);
    return createApiResponse(
      null,
      new AppError(
        "INTERNAL_SERVER_ERROR",
        "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        500
      )
    );
  }
}

export async function verifyEmail(
  token: string
): Promise<ApiResponse<{ verified: boolean } | null>> {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!verificationToken) {
      throw AUTH_ERRORS.INVALID_TOKEN;
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: {
          email: verificationToken.identifier,
        },
        data: {
          emailVerified: new Date(),
        },
      });

      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: verificationToken.identifier,
            token: verificationToken.token,
          },
        },
      });
    });

    return createApiResponse({ verified: true });
  } catch (error) {
    if (error instanceof AppError) {
      return createApiResponse(null, error);
    }

    console.error("Email verification error:", error);
    return createApiResponse(
      null,
      new AppError(
        "INTERNAL_SERVER_ERROR",
        "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        500
      )
    );
  }
}
