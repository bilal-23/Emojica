import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import Post from "@/components/Post/post";
import {
  useGetBookmarksQuery,
  useGetMyPostsQuery,
} from "@/queries/profileQueries";
import { Loader } from "../UI/loader";

interface Props {
  showBookmarks: boolean;
}
const ProfilePosts: React.FC<Props> = ({ showBookmarks }) => {
  const { isLoading: isPostsLoading, data: posts } = useGetMyPostsQuery();
  const { isLoading: isBookmarkLoading, data: bookmarks } =
    useGetBookmarksQuery();

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
          <Post />
        )}
      </TabsContent>
      <TabsContent value="bookmarks">
        {bookmarks?.length === 0 ? (
          <p className="text-center mt-5">No Post Bookmarked Yet</p>
        ) : (
          <Post />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ProfilePosts;
