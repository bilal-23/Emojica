import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Post from "../Post/post";

const ExplorePosts = () => {
  return (
    <div className="mt-2 sm:mt-5 mb-5 w-full flex flex-col h-full overflow-hidden">
      <div className="bg-white shadow rounded-lg py-2 px-2 mx-2 flex items-center gap-2  z-10">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="cursor-pointer transition-all active:scale-90"
        />
        <p className="text-gray-700">Explore Posts</p>
      </div>
      <div className="mx-2">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default ExplorePosts;
