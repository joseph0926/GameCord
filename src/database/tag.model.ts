import { Document, model, models, Schema } from 'mongoose';

export interface ITag {
  name: string;
  description?: string;
  posts: number;
  followers: number;
}

export interface ITagDoc extends ITag, Document {}

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    posts: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Tag = models?.Tag || model<ITag>('Tag', TagSchema);

export default Tag;
