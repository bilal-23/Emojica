import React from "react";
import Post from "@/components/Post/post";
import { useGetUserPostQuery } from "@/queries/userQueries";
import { Loader } from "../UI/loader";

interface Props {
  id: string;
}
const UserPosts: React.FC<Props> = ({ id }) => {
  const { isLoading, data: posts } = useGetUserPostQuery(id);
  if (isLoading) {
    return <Loader />;
  }
  if (posts.length === 0) {
    return <p className="text-center mt-5">No posts yet</p>;
  }

  return (
    <div>
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default UserPosts;
