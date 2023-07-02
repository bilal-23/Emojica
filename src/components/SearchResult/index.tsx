import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import UserSearchResult from "./user";
import { ScrollArea } from "@/components/UI/scroll";
import { useGetAllUserQuery } from "@/queries/userQueries";
import { allUsers } from "@/types/user";
import { useRouter } from "next/router";

const SearchResult = () => {
  const { data: allUsers } = useGetAllUserQuery();
  const [searchResut, setSearchResult] = useState<[] | allUsers[]>([]);
  const router = useRouter();
  // /search?q=hey
  const searchQuery = window.location.search.split("=")[1];

  useEffect(() => {
    if (allUsers) {
      const result = allUsers.users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`;
        return (
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fullName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setSearchResult(result);
    }
  }, [searchQuery]);

  return (
    <div className="mt-2 sm:mt-5 mb-5 w-full flex flex-col h-full overflow-hidden">
      <div className="bg-white shadow rounded-lg py-2 px-2 mx-2 flex items-center gap-2  z-10">
        <FontAwesomeIcon
          onClick={() => router.back()}
          icon={faChevronLeft}
          className="cursor-pointer transition-all active:scale-90"
        />
        <p className="text-gray-700">
          Search Result for <span className="font-bold">"{searchQuery}"</span>
        </p>
      </div>
      {/* <div > */}
      {searchResut && searchResut.length > 0 && (
        <ScrollArea className="shadow bg-white rounded-lg  mx-2 mt-2 p-2 sm:mt-5 mb-5 flex flex-col gap-2  overflow-scroll   md:max-h-[500px]">
          {searchResut.map((user, index, array) => (
            <UserSearchResult
              className={index === array.length - 1 ? "border-none" : ""}
              key={user._id}
              firstName={user.firstName}
              id={user._id}
              lastName={user.lastName}
              pic={user.pic}
              username={user.username}
            />
          ))}
        </ScrollArea>
      )}
      {searchResut && searchResut.length === 0 && (
        <p className="text-center mt-5">No User Found</p>
      )}
      {/* </div> */}
    </div>
  );
};

export default SearchResult;
