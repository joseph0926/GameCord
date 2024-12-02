import { Document, model, models, Schema, Types } from 'mongoose';

export interface IPost {
  title: string;
  content: string;
  author: Types.ObjectId;
  tags: Types.ObjectId[];
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
  media?: {
    type: 'image' | 'video' | 'clip';
    url: string;
  }[];
}

export interface IPostDoc extends IPost, Document {}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: true }],
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    media: [
      {
        type: { type: String, enum: ['image', 'video', 'clip'] },
        url: { type: String },
      },
    ],
  },
  { timestamps: true, collection: 'posts' }
);

const Post = models?.Post || model<IPost>('Post', PostSchema);

export default Post;
