export type TagType = {
  _id: string;
  name: string;
};

export type AuthorType = {
  _id: string;
  name: string;
  image: string;
};

export type PostType = {
  _id: string;
  title: string;
  tags: TagType[];
  author: AuthorType;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
};
