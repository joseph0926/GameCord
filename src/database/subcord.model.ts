import { Document, model, models, Schema, Types } from 'mongoose';

export interface ISubcord {
  name: string;
  description: string;
  creatorId: Types.ObjectId;
  moderators: Types.ObjectId[];
  members: Types.ObjectId[];
  tags: string[];
  icon?: string;
  banner?: string;
  rules: string[];
  channels: {
    name: string;
    type: 'text' | 'voice';
  }[];
}

export interface ISubcordDoc extends ISubcord, Document {}

const SubcordSchema = new Schema<ISubcord>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    moderators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tags: [{ type: String }],
    icon: { type: String },
    banner: { type: String },
    rules: [{ type: String }],
    channels: [
      {
        name: { type: String, required: true },
        type: { type: String, enum: ['text', 'voice'], required: true },
      },
    ],
  },
  { timestamps: true }
);

const Subcord = models?.Subcord || model<ISubcord>('Subcord', SubcordSchema);

export default Subcord;
