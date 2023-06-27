import About from "@/components/Profile/about";
import UserPosts from "@/components/Profile/user-posts";
import { GetServerSideProps } from "next";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const User = () => {
  return (
    <div className="w-full py-10 px-2">
      <About isProfile={false} />
      <UserPosts />
    </div>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { userId } = context.query;

  if (!session) {
    return {
      redirect: {
        destination: `/auth?redirect=user/[${userId}]`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
