import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import Post from "@/components/Post/post";
import { useGetBookmarksQuery } from "@/queries/profileQueries";
import { Loader } from "../UI/loader";
import { useGetAllPostsQuery } from "@/queries/postQueries";
import { useGetSession } from "@/hooks/use-session";

interface Props {
  showBookmarks: boolean;
}
const ProfilePosts: React.FC<Props> = ({ showBookmarks }) => {
  const sessionUserId = useGetSession();
  const { isLoading: isPostsLoading, data: posts } = useGetAllPostsQuery();
  const { isLoading: isBookmarkLoading, data: bookmarks } =
    useGetBookmarksQuery();
  const myPosts = posts?.filter((post) => post.author._id === sessionUserId);

  // If the bookmarks are loading, show the loader
  if (isBookmarkLoading || isPostsLoading) {
    return <Loader />;
  }

  return (
    <Tabs
      defaultValue={showBookmarks ? "bookmarks" : "posts"}
      className="w-full"
    >
      <TabsList className="w-full flex">
        <TabsTrigger value="posts" className="flex-1">
          Posts
        </TabsTrigger>
        <TabsTrigger value="bookmarks" className="flex-1">
          Bookmarks
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        {posts?.length === 0 ? (
          <p className="text-center mt-5">No Post Yet</p>
        ) : (
          myPosts?.map((post) => {
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
      </TabsContent>
      <TabsContent value="bookmarks">
        {bookmarks?.length === 0 ? (
          <p className="text-center mt-5">No Post Bookmarked Yet</p>
        ) : (
          bookmarks?.map((post) => {
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
      </TabsContent>
    </Tabs>
  );
};

export default ProfilePosts;
