import React, { useEffect, useState } from "react";
import Post from "@/components/Post/post";
import { useGetFeedPostsQuery } from "@/queries/postQueries";
import { Loader } from "../UI/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../UI/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { set } from "mongoose";

const Feed = () => {
  const { isLoading, data: posts } = useGetFeedPostsQuery();
  const [sortedPosts, setSortedPosts] = useState(posts || []);
  const [appliedSort, setAppliedSort] = useState("Newest");

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

  if (!posts && isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full xs:w-auto">
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
      {sortedPosts && sortedPosts.length > 0 ? (
        sortedPosts.map((post) => {
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
        <p className="text-center mt-5">
          Looks like your following haven't posted anything
        </p>
      )}
    </div>
  );
};

export default Feed;
