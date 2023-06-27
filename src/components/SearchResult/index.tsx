import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import UserSearchResult from "./user";
import { ScrollArea } from "@/components/UI/scroll";

const SearchResult = () => {
  return (
    <div className="mt-2 sm:mt-5 mb-5 w-full flex flex-col h-full overflow-hidden">
      <div className="bg-white shadow rounded-lg py-2 px-2 mx-2 flex items-center gap-2  z-10">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="cursor-pointer transition-all active:scale-90"
        />
        <p className="text-gray-700">
          Search Result for <span className="font-bold">"Search term"</span>
        </p>
      </div>
      {/* <div > */}
      <ScrollArea className="shadow bg-white rounded-lg  mx-2 mt-2 p-2 sm:mt-5 mb-5 flex flex-col gap-2  overflow-scroll   md:h-[500px]">
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
        <UserSearchResult />
      </ScrollArea>
      {/* </div> */}
    </div>
  );
};

export default SearchResult;
