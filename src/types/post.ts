export interface Post {
    likes: {
        likeCount: number;
        likedBy: string[];
        dislikedBy: string[];
    };
    _id: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
        username: string;
        pic: string;
    };
    imageUrl: string;
    content: string;
    comments: {
        _id: string;
        comment: string,
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            username: string;
            pic: string;
        },
        createdAt: Date,
        updatedAt: Date
    }[]; // Assuming the comments structure is not defined
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface PostDetail {
    likes: {
        likeCount: number;
        likedBy: {
            _id: string;
            firstName: string;
            lastName: string;
            username: string;
            pic: string;
        }[];
        dislikedBy: {
            _id: string;
            firstName: string;
            lastName: string;
            username: string;
            pic: string;
        }[];
    };
    _id: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
        username: string;
        pic: string;
    };
    imageUrl: string;
    content: string;
    comments: {
        _id: string;
        comment: string,
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            username: string;
            pic: string;
        },
        createdAt: Date,
        updatedAt: Date
    }[]; // Assuming the comments structure is not defined
    createdAt: string;
    updatedAt: string;
    __v: number;
}