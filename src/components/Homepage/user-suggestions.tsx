import React, { use } from "react";
import { useGetAllUserQuery } from "@/queries/userQueries";
import UserSearchResult from "../SearchResult/user";
import { Loader } from "../UI/loader";
import { useGetSession } from "@/hooks/use-session";
import { useGetProfileQuery } from "@/queries/profileQueries";

const UserSuggestions = () => {
  const { isLoading: isProfileLoading, data: profileData } =
    useGetProfileQuery();
  const { isLoading, data } = useGetAllUserQuery();
  const sessionUserId = useGetSession();
  return (
    <div className="hidden md:block lg:block py-8 pt-4 h-[500px] sticky top-[70px] mr-2 ">
      <div className="relative overflow-hidden min-h-[100px] w-[15rem] lg:w-[18rem] rounded-lg shadow border py-2 flex-shrink-1 bg-white">
        <header className="font-bold text-2xl px-2 lg:px-5 py-4 border-b">
          Who to follow
        </header>

        <main className="pt-2   max-h-[400px] border overflow-y-scroll">
          {isLoading && <Loader />}
          {data &&
            data.users.map(({ _id, firstName, lastName, username, pic }) => {
              return (
                _id !== sessionUserId &&
                !profileData?.following.find((item) => item._id === _id) && (
                  <UserSearchResult
                    key={_id}
                    id={_id}
                    firstName={firstName}
                    lastName={lastName}
                    username={username}
                    pic={pic}
                  />
                )
              );
            })}
        </main>
      </div>
    </div>
  );
};

export default UserSuggestions;
