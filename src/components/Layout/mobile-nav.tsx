import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faHouse,
  faBookmark,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { toast } from "react-toastify";

const MobileNav = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push("/auth");
    toast.success("Logged out successfully");
  };
  return (
    <nav className="flex sm:hidden bg-white shadow lg:px-48 border-t border-gray-400 sticky bottom-0">
      <div className="w-full px-5">
        <div className="flex justify-between h-16">
          <button
            className="flex-shrink-0 p-1 border-transparent text-gray-700 rounded-full hover:text-gray-600 focus:outline-none focus:text-gray-600 transition duration-150 ease-in-out"
            aria-label="Notifications"
          >
            <FontAwesomeIcon
              icon={faCompass}
              style={{ width: "25px", height: "25px" }}
            />
          </button>

          <button
            className="flex-shrink-0 p-1 border-transparent text-gray-700 rounded-full hover:text-gray-600 focus:outline-none focus:text-gray-600 transition duration-150 ease-in-out"
            aria-label="Notifications"
          >
            <FontAwesomeIcon
              icon={faHouse}
              style={{ width: "25px", height: "25px" }}
            />
          </button>
          <button
            className="flex-shrink-0 p-1 border-transparent text-gray-700 rounded-full hover:text-gray-600 focus:outline-none focus:text-gray-600 transition duration-150 ease-in-out"
            aria-label="Notifications"
          >
            <FontAwesomeIcon
              icon={faBookmark}
              style={{ width: "25px", height: "25px" }}
            />
          </button>
          <div className="ml-2 relative flex items-center ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <button
            className="flex-shrink-0 p-1 border-transparent text-gray-700 rounded-full hover:text-gray-600 focus:outline-none focus:text-gray-600 transition duration-150 ease-in-out"
            aria-label="Notifications"
            onClick={handleLogout}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ width: "25px", height: "25px" }}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
