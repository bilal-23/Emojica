import React from "react";
import ExplorePosts from "@/components/Explore";
import Head from "next/head";

const Explore = () => {
  return (
    <>
      <Head>
        <title>Emojica | Explore</title>
      </Head>
      <ExplorePosts />;
    </>
  );
};

export default Explore;
