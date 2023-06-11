import mongoose, { Types } from 'mongoose';
import { commentSchema } from './comment';

interface Post extends Document {
    author: Types.ObjectId;
    content: string;
    likes: {
        likeCount: number;
        likedBy: Types.ObjectId[];
        dislikedBy: Types.ObjectId[];
    };
    comments: {
        user: Types.ObjectId;
        comment: string;
        timestamp: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema<Post>({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //contains user Id of user who posted this post
    content: { type: String, required: true },
    likes: {
        likeCount: { type: Number, default: 0 },
        likedBy: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            default: []
        }, //contains user Ids of users who liked this post
        dislikedBy: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            default: []
        }, //contains user Ids of users who disliked this post
    },

    comments: { type: [commentSchema], default: [] }, //contains user Ids of users who commented on this post, along with their comments and timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);