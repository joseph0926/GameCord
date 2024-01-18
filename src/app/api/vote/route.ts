import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/user';

interface VoteProps {
  postId: string;
}

export async function POST({ postId }: VoteProps) {
  const user = await getCurrentUser();
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const existingVote = await db.vote.findFirst({
    where: {
      postId,
      profileId: user.id,
      type: 'UPVOTE'
    }
  });

  if (existingVote) {
    const vote = await db.vote.update({
      where: {
        id: existingVote.id
      },
      data: {
        type: 'DOWNVOTE'
      }
    });
    return Response.json({ vote });
  } else {
    const vote = await db.vote.create({
      data: {
        postId,
        profileId: user.id,
        type: 'UPVOTE',
        voteCount: 1
      }
    });
    return Response.json(vote);
  }
}
