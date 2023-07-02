import { useGetProfileQuery } from "@/queries/profileQueries";
import { Avatar, AvatarImage, AvatarFallback } from "../UI/avatar";
import { Loader } from "../UI/loader";
import { useGetAllPostsQuery } from "@/queries/postQueries";
import { useGetSession } from "@/hooks/use-session";
import { useState } from "react";
import EditProfile from "./edit-profile";
import Link from "next/link";

interface Props {
  isProfile: boolean;
}
const ProfileAbout: React.FC<Props> = ({ isProfile }) => {
  const sessionUserId = useGetSession();
  const { isLoading: isPostsLoading, data: posts } = useGetAllPostsQuery();
  const { isLoading, data } = useGetProfileQuery();

  const myPosts = posts?.filter((post) => post.author._id === sessionUserId);
  if ((isLoading && !data) || isPostsLoading) {
    return (
      <header className="flex flex-wrap items-center p-4 md:py-8 bg-white rounded-lg">
        <Loader />
      </header>
    );
  } else if (data)
    return (
      <>
        <header className="flex flex-wrap items-center p-4 md:py-8 bg-white rounded-lg">
          <div className="md:w-3/12 flex  justify-center">
            <Avatar
              className="h-20 w-20 flex justify-center items-center  bg-white object-cover rounded-full
                   border-2 p-1"
            >
              <AvatarImage src={data.pic} />
              <AvatarFallback className="bg-white">
                {data.firstName.split(" ")[0] +
                  " " +
                  data.lastName.split(" ")[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* <!-- profile meta --> */}
          <div className="w-8/12 md:w-7/12 ml-2 xs:ml-4">
            <div className="md:flex md:flex-wrap md:items-center mb-4">
              <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                @{data.username}
              </h2>

              {/* <!-- badge --> */}
              <span
                className="inline-block fas fa-certificate fa-lg text-blue-500 
                             relative mr-6 text-xl transform -translate-y-2"
                aria-hidden="true"
              >
                <i
                  className="fas fa-check text-white text-xs absolute inset-x-0
                             ml-1 mt-px"
                ></i>
              </span>

              {/* <!-- follow button --> */}
              <EditProfile
                firstName={data.firstName}
                lastName={data.lastName}
                bio={data.bio}
                link={data.link}
                email={data.email}
                username={data.username}
              />
            </div>

            {/* <!-- post, following, followers list for medium screens --> */}
            <ul className="hidden md:flex space-x-4 mb-4">
              <li>
                <span className="font-semibold">{myPosts?.length} </span>
                posts
              </li>

              <li>
                <span className="font-semibold">{data.followers.length} </span>
                followers
              </li>
              <li>
                <span className="font-semibold">{data.following.length} </span>
                following
              </li>
            </ul>

            {/* <!-- user meta form medium screens --> */}
            <div className="hidden md:block">
              <h1 className="font-semibold">
                {data.firstName + " " + data.lastName}
              </h1>
              <p>{data.bio}</p>
              {data.link && (
                <Link
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="text-blue-400">{data.link}</p>
                </Link>
              )}
            </div>
          </div>

          {/* <!-- user meta form small screens --> */}
          <div className="md:hidden text-sm my-2">
            <h1 className="font-semibold">
              {data.firstName + " " + data.lastName}
            </h1>
            <p>{data.bio}</p>
            {data.link && (
              <Link href={data.link} target="_blank" rel="noopener noreferrer">
                <p className="text-blue-400">{data.link}</p>
              </Link>
            )}
          </div>
          <div className="px-px md:px-3 w-full">
            <ul
              className="flex md:hidden justify-around space-x-8 border-t 
        text-center p-2 text-gray-600 leading-snug text-sm"
            >
              <li>
                <span className="font-semibold text-gray-800 block">
                  {myPosts?.length}{" "}
                </span>
                posts
              </li>

              <li>
                <span className="font-semibold text-gray-800 block">
                  {data.followers.length}{" "}
                </span>
                followers
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">
                  {data.following.length}{" "}
                </span>
                following
              </li>
            </ul>
          </div>
        </header>
      </>
    );
};

export default ProfileAbout;
