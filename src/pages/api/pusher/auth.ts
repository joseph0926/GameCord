import { NextApiRequest, NextApiResponse } from "next";

import { pusherServer } from "@/lib/pusher";
import { getCurrentUser } from "@/actions/user";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const profile = await getCurrentUser();

  if (!profile) {
    return response.status(401);
  }

  const socketId = request.body.socket_id;
  const channel = request.body.channel_name;
  const data = {
    user_id: profile.email,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
  return response.send(authResponse);
}
