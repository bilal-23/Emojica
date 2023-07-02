import SearchResult from "@/components/SearchResult";
import Head from "next/head";
import React from "react";

const Search = () => {
  return (
    <>
      <Head>
        <title>Emojica | Search</title>
      </Head>
      <SearchResult />;
    </>
  );
};

export default Search;
