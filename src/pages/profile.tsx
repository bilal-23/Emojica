import Post from "@/components/Post/post";
import About from "@/components/Profile/about";
import ProfilePosts from "@/components/Profile/profile-posts";
import { Avatar } from "@/components/UI/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

interface Props {
  bookmarks: boolean;
}
const Profile: NextPage<Props> = ({ bookmarks }) => {
  return (
    <div className="w-full pb-10 pt-5 px-2">
      <About isProfile={true} />
      <ProfilePosts showBookmarks={bookmarks} />
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
