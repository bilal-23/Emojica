import React, { useEffect, useState } from "react";
import { Avatar } from "../UI/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetSession } from "@/hooks/use-session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import {
  useBookmarkPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useLikePostMutation,
  useUnbookmarkPostMutation,
  useUnlikePostMutation,
} from "@/queries/post-action-queries";
import { useGetBookmarksQuery } from "@/queries/profileQueries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogTrigger } from "../UI/dialog";
import EditPost from "./edit-post";
import { Loader } from "../UI/loader";

interface Props {
  authorName: string;
  authorId: string;
  authorAvatar: string;
  authorUsername: string;
  authorAvatarFallback: string;
  content: string;
  image?: string;
  commentsCount: number;
  likesCount: number;
  likedBy: string[];
  postId: string;
  updatedAt: Date;
}
const Post: React.FC<Props> = ({
  authorName,
  authorAvatar,
  authorId,
  authorUsername,
  authorAvatarFallback,
  commentsCount,
  content,
  image,
  likesCount,
  likedBy,
  postId,
  updatedAt,
}) => {
  const router = useRouter();
  const sessionUserId = useGetSession();
  const { data: bookmarkedPosts } = useGetBookmarksQuery();
  const { mutate: likePost } = useLikePostMutation(postId);
  const { mutate: unlikePost } = useUnlikePostMutation(postId);
  const { mutate: bookmark } = useBookmarkPostMutation(postId);
  const { mutate: unbookmark } = useUnbookmarkPostMutation(postId);
  const { mutate: deletePost } = useDeletePostMutation(postId);
  const { isLoading: isEditing, mutate: editPost } =
    useEditPostMutation(postId);
  const [message, setMessage] = useState(content);
  const isLiked = likedBy.includes(sessionUserId);
  const isBookmarked = bookmarkedPosts?.find((post) => post._id === postId);

  const handleLikeUnlike = () => {
    if (isLiked) {
      unlikePost();
    } else {
      likePost();
    }
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      unbookmark();
    } else {
      bookmark();
    }
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/post/${postId}`);
  };

  const handleEditPost = () => {
    editPost({ content: message });
  };

  return (
    <div className="bg-white shadow rounded-lg mt-2 sm:mt-5 relative">
      <div className="flex flex-row justify-between px-2 py-3 mx-3">
        <div className="flex flex-row">
          <Link
            href={`${
              authorId === sessionUserId ? "profile" : "/user/" + authorId
            }`}
          >
            <Avatar className=" border-2  w-10 h-10 object-cover rounded-full  mr-2 cursor-pointer flex items-center justify-center ">
              <AvatarImage src={authorAvatar} />
              <AvatarFallback>{authorAvatarFallback}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col mb-2 ml-4 mt-1">
            <Link
              href={`${
                authorId === sessionUserId ? "profile" : "/user/" + authorId
              }`}
            >
              <div className="text-gray-600 text-sm font-semibold">
                {authorName}
              </div>
            </Link>
            <div className="flex w-full mt-1">
              <Link
                href={`${
                  authorId === sessionUserId ? "profile" : "/user/" + authorId
                }`}
              >
                <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                  @{authorUsername}
                </div>
              </Link>
              {/* <div className="text-gray-400 font-thin text-xs">{1 day ago}</div> */}
            </div>
          </div>
        </div>
        {sessionUserId === authorId && (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="h-auto w-[20px] ">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DialogTrigger asChild>
                  <DropdownMenuItem>Edit Post</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem onClick={() => deletePost()}>
                  Delete Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <EditPost
              handleEditPost={handleEditPost}
              message={message}
              setMessage={setMessage}
            />
          </Dialog>
        )}
      </div>
      <div className="border-b border-gray-100"></div>
      <Link href={`/post/${postId}`}>
        {image && (
          <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
            <img className="rounded w-full" src={image} />
          </div>
        )}
        <div className="text-gray-500 text-sm mt-5 mb-6 mx-3 px-2">
          {content}
        </div>
      </Link>
      <div className="flex justify-start mb-4 border-t border-gray-100">
        <div className="flex w-full mt-1 pt-2 pl-5">
          {/* Bookmark */}
          <span
            className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2"
            onClick={handleBookmark}
          >
            <svg
              className={`text-blue-500 ${isBookmarked ? "fill-blue-500" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="14px"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              ></path>
            </svg>
          </span>
        </div>
        <div className="flex justify-end w-full mt-1 pt-2 pr-5">
          {/* SHARE ICON */}
          <span className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="14px"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              ></path>
            </svg>
          </span>
          {/* HEART ICON */}
          <span
            className="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer"
            onClick={handleLikeUnlike}
          >
            <svg
              className={`h-4 w-4 text-red-500 ${
                isLiked ? "fill-red-500" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <div className="flex w-full border-t border-gray-100 justify-between gap-2">
        <div className="mt-3 mx-2 xs:mx-5 flex flex-row text-xs">
          <Link href={`/post/${postId}`}>
            <div className="flex text-gray-700 font-normal rounded-md mb-2 xs:mr-4 items-center cursor-pointer hover:text-blue-500">
              Comments:
              <div className="ml-1 text-gray-400 text-ms font-semibold">
                {commentsCount}
              </div>
            </div>
          </Link>
        </div>
        <div className="mt-3 xs:mx-5 w-full flex justify-end text-xs">
          <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center">
            Likes:{" "}
            <div className="ml-1 text-gray-400 text-ms">{likesCount}</div>
          </div>
        </div>
      </div>
      <form
        className="w-full relative flex items-center self-center  p-4 overflow-hidden text-gray-600 focus-within:text-gray-400"
        onSubmit={handleCommentSubmit}
      >
        <Link href="/profile">
          <Avatar className="w-10 h-10 object-cover rounded-full  mr-2 cursor-pointer flex items-center justify-center shadow-inner border">
            <AvatarImage src="/" />
            <AvatarFallback>BM</AvatarFallback>
          </Avatar>
        </Link>
        <input
          type="search"
          className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue rounded-[25px]"
          placeholder="Post a comment..."
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default Post;
