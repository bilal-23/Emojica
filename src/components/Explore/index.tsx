import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Post from "../Post/post";
import { useGetAllPostsQuery } from "@/queries/postQueries";
import { Loader } from "../UI/loader";

const ExplorePosts = () => {
  const { isLoading, data: posts } = useGetAllPostsQuery();
  return (
    <div className="mt-2 sm:mt-5 mb-5 w-full flex flex-col h-full overflow-hidden">
      <div className="bg-white shadow rounded-lg py-2 px-2 mx-2 flex items-center gap-2  z-1">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="cursor-pointer transition-all active:scale-90"
        />
        <p className="text-gray-700">Explore Posts</p>
      </div>
      <div className="mx-2 relative">
        {isLoading && <Loader />}
        {posts && posts.length > 0 ? (
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
                likedBy={post.likes.likedBy}
                postId={post._id}
                updatedAt={post.updatedAt}
              />
            );
          })
        ) : (
          <p className="text-center mt-5">No Posts here</p>
        )}
      </div>
    </div>
  );
};

export default ExplorePosts;
