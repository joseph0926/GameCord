import { CommentType } from './comment.type';
import { UserType } from './user.type';

export type TagType = {
  _id: string;
  name: string;
};

export type MediaType = {
  type: 'image' | 'video' | 'clip';
  url: string;
};

export type PostType = {
  _id: string;
  title: string;
  content: string;
  author: UserType;
  tags: TagType[];
  upvotes: string[];
  downvotes: string[];
  media: MediaType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  comments: CommentType[];
};

export type PostPayload = {
  title: string;
  content: string;
  tags: string[];
};
