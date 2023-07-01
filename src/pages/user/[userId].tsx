import UserPosts from "@/components/Profile/user-posts";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import UserAbout from "@/components/Profile/user-about";

interface Props {
  id: string;
}
const User: NextPage<Props> = ({ id }) => {
  return (
    <div className="w-full py-10 px-2">
      <UserAbout id={id} />
      <UserPosts id={id} />
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
      id: userId,
    },
  };
};
