import React from "react";
import { Avatar } from "../UI/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useGetProfileQuery } from "@/queries/profileQueries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const CreatePost = () => {
  const { isLoading, data } = useGetProfileQuery();
  const name =
    data && data?.firstName.split("")[0] + data?.lastName.split("")[0];

  return (
    <div className="flex flex-col xs:max-w-md w-full border-y p-4 border border-b-4">
      <div className="flex gap-2">
        <Avatar className="flex justify-center items-center border-2 border-gray-300 relative z-0">
          <AvatarImage src={data?.pic} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start gap-1">
          <textarea
            className="w-full h-20 px-4 py-2 border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:border-[#374151] transition duration-300"
            rows={2}
            cols={50}
            placeholder="What's happening?"
            spellCheck="false"
          ></textarea>
          <div className="w-full flex items-center justify-between pl-2">
            <FontAwesomeIcon
              icon={faImage}
              className="text-xl text-[#374151] cursor-not-allowed"
            />
            <button className="bg-[#374151] active:scale-[0.99] transition-all text-white font-semibold text-sm py-1 px-3 rounded-full  float-right">
              POST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
