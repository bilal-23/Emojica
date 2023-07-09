import { faChevronLeft, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Post from "../Post/post";
import { useGetAllPostsQuery } from "@/queries/postQueries";
import { Loader } from "../UI/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../UI/dropdown-menu";
import { useRouter } from "next/router";

const ExplorePosts = () => {
  const { isLoading, data: posts } = useGetAllPostsQuery();
  const [sortedPosts, setSortedPosts] = useState(posts || []);
  const [appliedSort, setAppliedSort] = useState("Newest");
  const router = useRouter();

  useEffect(() => {
    setSortedPosts(posts || []);
  }, [posts]);

  const handleChangeSort = (sort: string) => {
    if (!posts) return;
    if (sort === "Newest") {
      setAppliedSort("Newest");
      // Sort by updated at
      const sorted = posts?.sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
      setSortedPosts(sorted);
    } else if (sort === "Oldest") {
      setAppliedSort("Oldest");
      // Sort by updated at
      const sorted = posts?.sort((a, b) => {
        return (
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      });
      setSortedPosts(sorted);
    } else if (sort === "Trending") {
      setAppliedSort("Trending");
      //Sort by likes
      const sorted = posts?.sort((a, b) => {
        return b.likes.likeCount - a.likes.likeCount;
      });
      setSortedPosts(sorted);
    }
  };

  return (
    <div className="mt-2 sm:mt-5 mb-5 w-full flex flex-col h-full overflow-hidden">
      <div className="bg-white shadow rounded-lg py-2 px-2 mx-2 flex items-center gap-2  z-1">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="cursor-pointer transition-all active:scale-90"
          onClick={() => router.back()}
        />
        <p className="text-gray-700">Explore Posts</p>
      </div>
      {posts && (
        <div className="mx-2 relative">
          <div className="w-full my-2 px-2 flex justify-between">
            <p>{appliedSort}</p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="h-auto w-[20px] ">
                  <FontAwesomeIcon icon={faSliders} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={`cursor-pointer`}
                  onClick={() => handleChangeSort("Newest")}
                >
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleChangeSort("Oldest")}
                >
                  Oldest
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleChangeSort("Trending")}
                >
                  Trending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {isLoading && <Loader />}
          {posts && posts.length > 0 ? (
            sortedPosts.map((post) => {
              return (
                <Post
                  key={post._id}
                  authorAvatar={post.author.pic}
                  authorId={post.author._id}
                  authorName={
                    post.author.firstName + " " + post.author.lastName
                  }
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
      )}
    </div>
  );
};

export default ExplorePosts;
