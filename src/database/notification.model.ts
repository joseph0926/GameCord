import { Document, model, models, Schema, Types } from 'mongoose';

export interface INotification {
  recipientId: Types.ObjectId;
  type: 'mention' | 'reply' | 'friend_request' | 'achievement';
  content: string;
  link?: string;
  read: boolean;
}

export interface INotificationDoc extends INotification, Document {}

const NotificationSchema = new Schema<INotification>(
  {
    recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['mention', 'reply', 'friend_request', 'achievement'],
      required: true,
    },
    content: { type: String, required: true },
    link: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification =
  models?.Notification ||
  model<INotification>('Notification', NotificationSchema);

export default Notification;
