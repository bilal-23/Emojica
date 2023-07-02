import React from "react";
import { Loader } from "../UI/loader";
import { useGetAllPostsQuery } from "@/queries/postQueries";
import Post from "../Post/post";

interface Props {
  id: string;
}
const UserPosts: React.FC<Props> = ({ id }) => {
  const { isLoading, data: posts } = useGetAllPostsQuery();

  const userPosts = posts?.filter((post) => post.author._id === id);

  if (isLoading) {
    return <Loader />;
  }
  if (posts?.length === 0) {
    return <p className="text-center mt-5">No posts yet</p>;
  }

  return (
    <div>
      {userPosts?.length === 0 ? (
        <p className="text-center mt-5">No Post Yet</p>
      ) : (
        userPosts?.map((post) => {
          return (
            <Post
              key={post._id}
              authorAvatar={post.author.pic}
              authorId={post.author._id}
              authorName={post.author.firstName + " " + post.author.lastName}
              authorAvatarFallback={
                post.author.firstName[0] + post.author.lastName[0]
              }
              authorUsername={post.author.username}
              commentsCount={post.comments.length}
              content={post.content}
              likesCount={post.likes.likeCount}
              likedBy={post.likes.likedBy}
              postId={post._id}
              updatedAt={post.updatedAt}
            />
          );
        })
      )}
    </div>
  );
};

export default UserPosts;
