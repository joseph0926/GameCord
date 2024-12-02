import { UserType } from './user.type';

export type CommentType = {
  _id: string;
  content: string;
  authorId: UserType;
  postId: string;
  parentId?: Comment;
  upvotes: string[];
  downvotes: string[];
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
};
