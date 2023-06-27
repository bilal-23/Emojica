import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/avatar";
import { Button } from "../UI/Button";

const UserSearchResult = () => {
  return (
    <div className="flex items-center gap-2 justify-between py-2 border-b">
      <div className="flex gap-2 xs:gap-5">
        <Avatar
          className="h-10 w-10 flex justify-center items-center  bg-white object-cover rounded-full
        border-2 border-pink-600 p-1"
        >
          <AvatarImage src="" />
          <AvatarFallback className="bg-white">JW</AvatarFallback>
        </Avatar>
        <div className="">
          <p className="text-md font-semibold">Bilal Mansuri</p>
          <p className="text-xs">@bilal</p>
        </div>
      </div>
      <button
        className="bg-blue-500 px-2 py-1 
                      text-white font-semibold text-sm rounded block text-center 
                      sm:inline-block "
      >
        Follow
      </button>
    </div>
  );
};

export default UserSearchResult;
