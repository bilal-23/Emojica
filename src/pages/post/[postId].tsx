import React from "react";
import { GetServerSideProps } from "next";
import PostDetail from "@/components/Post/detail-post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Head from "next/head";

interface PostProps {
  postId: string;
}
const Post: React.FC<PostProps> = ({ postId }) => {
  return (
    <>
      <Head>
        <title>Emojica | Post</title>
      </Head>
      <div className="flex flex-col pt-5 w-full px-2">
        <PostDetail id={postId} />
      </div>
    </>
  );
};

export default Post;

// Get Post Id
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { params } = context;
  const postId = params?.postId;

  if (!session) {
    return {
      redirect: {
        destination: `/auth?redirect=post/[${postId}]`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      postId,
    },
  };
};
