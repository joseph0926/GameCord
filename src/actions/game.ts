'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from './user';
import { NextResponse } from 'next/server';
import { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';

type CreateGameProps = {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
  publisher: string;
  releaseDate: any;
  jjal?: string;
  path: string;
};

export const createGame = async (data: CreateGameProps) => {
  try {
    const profile = await getCurrentUser();
    if (!profile || profile.id === 'null') {
      throw null;
    }
    if (profile.role !== UserRole.TOP) {
      throw null;
    }

    const { title, description, category, imageUrl, link, publisher, releaseDate, jjal, path } = data;

    const game = await db.game.create({
      data: {
        title,
        description,
        category,
        imageUrl,
        link,
        publisher,
        releaseDate,
        jjal,
        profileId: profile.id
      }
    });

    revalidatePath(path);

    return NextResponse.json(game);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getGames = async () => {
  try {
    const games = await db.game.findMany({
      where: {}
    });

    return games;
  } catch (error) {
    console.log(error);
    return null;
  }
};
