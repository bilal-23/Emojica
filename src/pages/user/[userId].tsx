import About from "@/components/Profile/about";
import UserPosts from "@/components/Profile/user-posts";
import React from "react";

const User = () => {
  return (
    <div className="w-full py-10 px-2">
      <About isProfile={false} />
      <UserPosts />
    </div>
  );
};

export default User;
