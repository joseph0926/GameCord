import { Document, model, models, Schema, Types } from 'mongoose';

export interface IComment {
  content: string;
  authorId: Types.ObjectId;
  postId: Types.ObjectId;
  parentId?: Types.ObjectId;
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
}

export interface ICommentDoc extends IComment, Document {}

const CommentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Comment = models?.Comment || model<IComment>('Comment', CommentSchema);

export default Comment;
