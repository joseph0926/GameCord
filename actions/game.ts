import { db } from '@/lib/db';
import { getCurrentUser } from './user';
import { NextResponse } from 'next/server';
import { UserRole } from '@prisma/client';

type CreateGameProps = {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
  publisher: string;
  releaseDate: Date;
  jjal?: string;
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

    const { title, description, category, imageUrl, link, publisher, releaseDate, jjal } = data;

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

    return NextResponse.json(game);
  } catch (error) {
    console.log(error);
    return error;
  }
};
