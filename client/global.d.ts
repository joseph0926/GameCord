import { Member, User, Server } from '@prisma/client';
import { Server as NextServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketServer } from 'socket.io';

type ServerWithMembersWithUser = Server & {
  members: (Member & { user: User })[];
};

type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NextServer & {
      io: SocketServer;
    };
  };
};
