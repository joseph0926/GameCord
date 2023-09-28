import { Member, User, Server } from '@prisma/client';
import { NextApiResponse } from 'next';

type ServerWithMembersWithUser = Server & {
  members: (Member & { user: User })[];
};
