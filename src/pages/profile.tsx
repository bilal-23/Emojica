import ProfilePosts from "@/components/Profile/profile-posts";
import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import ProfileAbout from "@/components/Profile/profile-about";
import Head from "next/head";

interface Props {
  bookmarks: boolean;
}
const Profile: NextPage<Props> = ({ bookmarks }) => {
  return (
    <>
      <Head>
        <title>Emojica | Profile</title>
      </Head>
      <div className="w-full pb-10 pt-5 px-2">
        <ProfileAbout isProfile={true} />
        <ProfilePosts showBookmarks={bookmarks} />
      </div>
    </>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth?redirect=profile",
        permanent: false,
      },
    };
  }
  const { bookmarks } = context.query;
  if (bookmarks === "true") {
    return {
      props: {
        bookmarks: true,
      },
    };
  }
  return {
    props: {
      bookmarks: false,
    },
  };
};
