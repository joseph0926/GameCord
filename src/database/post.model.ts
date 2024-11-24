import { Document, model, models, Schema, Types } from 'mongoose';

export interface IPost {
  title: string;
  content: string;
  authorId: Types.ObjectId;
  subcordId: Types.ObjectId;
  tags: string[];
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
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subcordId: { type: Schema.Types.ObjectId, ref: 'Subcord', required: true },
    tags: [{ type: String }],
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    media: [
      {
        type: { type: String, enum: ['image', 'video', 'clip'] },
        url: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Post = models?.Post || model<IPost>('Post', PostSchema);

export default Post;
