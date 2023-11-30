'use server';

import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { ChannelType, Game, MemberRole, Server } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/actions/user';
import { NextResponse } from 'next/server';

type CreateServerProps = {
  name: string;
  imageUrl: string;
  path: string;
  gameId: string;
};

export type ServerWithGame = Server & {
  game: Game;
};

export const createServer = async ({ data }: { data: CreateServerProps }) => {
  try {
    const profile = await getCurrentUser();
    if (!profile) {
      return null;
    }

    const { name, imageUrl, path, gameId } = data;

    const existingServer = await db.server.findUnique({
      where: {
        gameId
      }
    });
    if (existingServer) {
      throw new NextResponse('이미 해당 게임의 서버가 존재합니다.', { status: 400 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: 'general', profileId: profile.id, type: ChannelType.TEXT }]
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }]
        },
        gameId
      }
    });

    revalidatePath(path);

    return server;
  } catch (error: any) {
    console.log(error);
    throw error.message ? error.message : error;
  }
};

export const getServers = async (): Promise<Server[] | null> => {
  try {
    const servers = await db.server.findMany({
      where: {}
    });

    return servers;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const joinServer = async (serverId: string) => {
  try {
    const profile = await getCurrentUser();
    if (!profile || profile === 'null') {
      return null;
    }

    const serverMembers = await db.member.findMany({
      where: {
        serverId
      }
    });

    const existingMember = serverMembers.find((member) => member.profileId === profile.id);
    if (existingMember) {
      return null;
    }

    await db.server.update({
      where: {
        id: serverId
      },
      data: {
        members: {
          create: [
            {
              profileId: profile.id
            }
          ]
        }
      }
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
