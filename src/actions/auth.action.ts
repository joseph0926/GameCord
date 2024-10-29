"use server";

import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/token";
import { AppError, AUTH_ERRORS } from "@/lib/errors";
import { z } from "zod";
import { emailVerificationSchema, registerSchema } from "@/schemas/auth.schema";
import { ApiResponse } from "@/types/common.type";
import { prisma } from "@/db/prisma";
import { createApiResponse } from "@/services/api";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaClient } from "@prisma/client";

type TransactionClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;

export async function register(
  rawData: z.infer<typeof registerSchema>
): Promise<ApiResponse<{ userId: string } | null>> {
  try {
    // Zod validation
    const validatedData = registerSchema.parse(rawData);
    const { email, password, name } = validatedData;

    // 이메일 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw AUTH_ERRORS.EMAIL_EXISTS;
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 12);

    // 트랜잭션으로 유저 생성 및 인증 토큰 생성
    const verificationToken = generateVerificationToken();

    const { user } = await prisma.$transaction(
      async (tx: TransactionClient) => {
        const user = await tx.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
          },
        });

        await tx.verificationToken.create({
          data: {
            identifier: email,
            token: verificationToken,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        });

        return { user };
      }
    );

    // 이메일 발송 (트랜잭션 외부에서 처리)
    await sendVerificationEmail(email, verificationToken).catch((error) => {
      console.error("Failed to send verification email:", error);
      // 이메일 전송 실패는 사용자 생성 실패로 이어지지 않도록 함
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
      // Prisma 에러 처리
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
  rawData: z.infer<typeof emailVerificationSchema>
): Promise<ApiResponse<{ verified: boolean } | null>> {
  try {
    const { token } = emailVerificationSchema.parse(rawData);

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

    // 트랜잭션으로 이메일 인증 처리
    await prisma.$transaction(async (tx: TransactionClient) => {
      await tx.user.update({
        where: {
          email: verificationToken.identifier,
        },
        data: {
          emailVerified: new Date(),
        },
      });

      await tx.verificationToken.delete({
        where: {
          id: [verificationToken.identifier, verificationToken.token],
        },
      });
    });

    return createApiResponse({ verified: true });
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
