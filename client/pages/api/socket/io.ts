import { NextApiResponseServerIO } from '@/global';
import { getCurrentUser, getCurrentUserAsPage } from '@/lib/actions/user/fetchActions';
import { Server as NextServer } from 'http';
import { NextApiRequest } from 'next';
import { redirect } from 'next/navigation';
import { Server as SocketServer } from 'socket.io';

export const config = {
  api: {
    bodyParser: false
  }
};

const ioHandler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
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
