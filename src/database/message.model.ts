import { Document, model, models, Schema, Types } from 'mongoose';

export interface IMessage {
  content: string;
  authorId: Types.ObjectId;
  channelId: Types.ObjectId;
  attachments?: {
    type: 'image' | 'video' | 'file';
    url: string;
  }[];
}

export interface IMessageDoc extends IMessage, Document {}

const MessageSchema = new Schema<IMessage>(
  {
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    channelId: { type: Schema.Types.ObjectId, ref: 'Subcord', required: true },
    attachments: [
      {
        type: { type: String, enum: ['image', 'video', 'file'] },
        url: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Message = models?.Message || model<IMessage>('Message', MessageSchema);

export default Message;
