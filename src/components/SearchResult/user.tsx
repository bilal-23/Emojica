import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/avatar";
import Link from "next/link";
import {
  useFollowUserMutation,
  useGetProfileQuery,
  useUnfollowUserMutation,
} from "@/queries/profileQueries";
import { Loader } from "../UI/loader";

interface Props {
  id: string;
  pic: string;
  firstName: string;
  lastName: string;
  username: string;
  className?: string;
}

const UserSearchResult: React.FC<Props> = ({
  id,
  firstName,
  lastName,
  pic,
  username,
  className,
}) => {
  const { isLoading, data } = useGetProfileQuery();
  const { mutate: followUser, isLoading: isMutating } = useFollowUserMutation();
  const { mutate: unfollowUser, isLoading: isUnfollowing } =
    useUnfollowUserMutation();

  const handleFollow = () => {
    followUser(id);
  };
  const handleUnfollow = () => {
    unfollowUser(id);
  };

  if ((isLoading && !data) || (isMutating && !data)) {
    return <Loader />;
  }

  if (!data) return null;

  const isFollowing =
    data.following.length !== 0
      ? data.following.find((user) => user._id === id)
      : false;

  return (
    <div
      className={`${className} relative px-2 lg:px-5 flex items-center gap-2 justify-between py-2 border-b`}
    >
      {isLoading || isMutating || isUnfollowing ? <Loader /> : null}
      <Link href={`/user/${id}`}>
        <div className="flex gap-2 xs:gap-5 items-center">
          <Avatar
            className="h-10 w-10 flex justify-center items-center  bg-white object-cover rounded-full
          border-2 border-pink-600 p-1"
          >
            <AvatarImage src={pic} />
            <AvatarFallback className="bg-white">
              {" "}
              {firstName.split(" ")[0] + " " + lastName.split(" ")[0]}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <p className="text-md font-semibold">
              {firstName + " " + lastName}
            </p>
            <p className="text-xs">@{username}</p>
          </div>
        </div>
      </Link>

      {isFollowing ? (
        <button
          className="text-blue-500 border-blue-500 border px-2 py-1 
        bg-white font-semibold text-sm rounded block text-center 
                      sm:inline-block "
          onClick={handleUnfollow}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="bg-blue-500 px-2 py-1 
      text-white font-semibold text-sm rounded block text-center 
                    sm:inline-block "
          onClick={handleFollow}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default UserSearchResult;
