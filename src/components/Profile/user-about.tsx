import { Loader } from "../UI/loader";
import { useGetUserQuery } from "@/queries/userQueries";
import { Avatar, AvatarImage, AvatarFallback } from "../UI/avatar";
import { useGetAllPostsQuery } from "@/queries/postQueries";
import {
  useFollowUserMutation,
  useGetProfileQuery,
  useUnfollowUserMutation,
} from "@/queries/profileQueries";

interface Props {
  id: string;
}
const UserAbout: React.FC<Props> = ({ id }) => {
  const { isLoading, data } = useGetUserQuery(id);
  const { data: loggedInUser } = useGetProfileQuery();
  const { isLoading: isPostsLoading, data: posts } = useGetAllPostsQuery();
  const { mutate: followUser, isLoading: isMutating } = useFollowUserMutation();
  const { mutate: unfollowUser, isLoading: isUnfollowing } =
    useUnfollowUserMutation();
  const userPosts = posts?.filter((post) => post.author._id === id);

  const isFollowing =
    loggedInUser?.following.length !== 0
      ? loggedInUser?.following.find((user) => user._id === id)
      : false;

  const handleFollow = () => {
    followUser(id);
  };
  const handleUnfollow = () => {
    unfollowUser(id);
  };

  if (isLoading && !data) {
    return (
      <header className="flex flex-wrap items-center p-4 md:py-8 bg-white rounded-lg">
        <Loader />
      </header>
    );
  } else if (data)
    return (
      <header className="flex flex-wrap items-center p-4 md:py-8 bg-white rounded-lg relative">
        {isMutating && <Loader />}
        {isUnfollowing && <Loader />}
        <div className="md:w-3/12 flex  justify-center">
          <Avatar
            className="h-20 w-20 flex justify-center items-center  bg-white object-cover rounded-full
                   border-2 p-1"
          >
            <AvatarImage src={data.pic} />
            <AvatarFallback className="bg-white">
              {data.firstName.split(" ")[0] + " " + data.lastName.split(" ")[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* <!-- profile meta --> */}
        <div className="w-8/12 md:w-7/12 ml-2 xs:ml-4">
          <div className="md:flex md:flex-wrap md:items-center mb-4">
            <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
              {data.username}
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

          {/* <!-- post, following, followers list for medium screens --> */}
          <ul className="hidden md:flex space-x-4 mb-4">
            <li>
              <span className="font-semibold">{userPosts?.length} </span>
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
          </div>
        </div>

        {/* <!-- user meta form small screens --> */}
        <div className="md:hidden text-sm my-2">
          <h1 className="font-semibold">
            {data.firstName + " " + data.lastName}
          </h1>
          <p>{data.bio}</p>
        </div>
        <div className="px-px md:px-3 w-full">
          <ul
            className="flex md:hidden justify-around space-x-8 border-t 
        text-center p-2 text-gray-600 leading-snug text-sm"
          >
            <li>
              <span className="font-semibold text-gray-800 block">0 </span>
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
    );
};

export default UserAbout;
