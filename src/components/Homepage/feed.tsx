import React from "react";
import Post from "@/components/Post/post";
import { useGetFeedPostsQuery } from "@/queries/postQueries";
import { Loader } from "../UI/loader";

const Feed = () => {
  const { isLoading, data: posts } = useGetFeedPostsQuery();

  if (!posts && isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full xs:w-auto">
      {posts ? (
        posts.map((post) => {
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
              postId={post._id}
              updatedAt={post.updatedAt}
            />
          );
        })
      ) : (
        <p className="text-center mt-5">No Posts</p>
      )}
    </div>
  );
};

export default Feed;
