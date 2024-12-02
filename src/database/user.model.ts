import { Document, model, models, Schema } from 'mongoose';

export interface IUser {
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
}

export interface IUserDoc extends IUser, Document {}
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
      match: /^[가-힣a-zA-Z0-9_-]+$/,
    },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    image: { type: String },
    location: { type: String },
    portfolio: { type: String },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'users' }
);

const User = models?.User || model<IUser>('User', UserSchema);

export default User;
