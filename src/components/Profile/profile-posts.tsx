import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import Post from "@/components/Post/post";
import { useRouter } from "next/router";

interface Props {
  showBookmarks: boolean;
}
const ProfilePosts: React.FC<Props> = ({ showBookmarks }) => {
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
        <Post />
        <Post />
        <Post />
      </TabsContent>
      <TabsContent value="bookmarks">
        <Post />
        <Post />
        <Post />
      </TabsContent>
    </Tabs>
  );
};

export default ProfilePosts;
