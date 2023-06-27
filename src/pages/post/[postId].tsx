import React from "react";
import { GetServerSideProps } from "next";
import PostDetail from "@/components/Post/detail-post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface PostProps {
  postId: string;
}
const Post: React.FC<PostProps> = ({ postId }) => {
  console.log(postId);
  return (
    <div className="flex flex-col pt-5 w-full px-2">
      <PostDetail />
    </div>
  );
};

export default Post;

// Get Post Id
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const postId = params?.postId;

  console.log(postId);

  return {
    props: {
      postId,
    },
  };
};
