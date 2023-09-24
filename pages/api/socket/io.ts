import { NextApiResponseServerIO } from '@/global';
import { Server as NextServer } from 'http';
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';
import { Server as SocketServer } from 'socket.io';

export const config = {
  api: {
    bodyParser: false
  }
};

const ioHandler = (req: NextRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = '/api/socket/io';
    const httpServer: NextServer = res.socket.server as any;
    const io = new SocketServer(httpServer, {
      path,
      // @ts-ignore
      addTrailingSlash: false
    });
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
