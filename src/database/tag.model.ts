import { Document, model, models, Schema, Types } from 'mongoose';

export interface ITag {
  name: string;
  description?: string;
  followers: number;
  posts: Types.ObjectId[];
}

export interface ITagDoc extends ITag, Document {}

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    followers: { type: Number, default: 0 },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post', required: true }],
  },
  { timestamps: true, collection: 'tags' }
);

const Tag = models?.Tag || model<ITag>('Tag', TagSchema);

export default Tag;
