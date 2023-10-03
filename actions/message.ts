import { Message } from '@prisma/client';

export const getMessages = async (pageParam: string | undefined, url: string) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error(await res.json());
    }

    const messageData = await res.json();
    const messages: Message[] = messageData.messages;

    return await res.json();
  } catch (error) {
    console.log(error);
    return { messages: [] };
  }
};
