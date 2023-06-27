import React from "react";
import { ScrollArea } from "@/components/UI/scroll";
import Link from "next/link";

const UserSuggestions = () => {
  return (
    <div className="hidden md:block lg:block py-8 pt-4 h-max sticky top-[70px] mr-2 ">
      <div className="w-[15rem] lg:w-[18rem] rounded-lg shadow border py-2 flex-shrink-1 bg-white">
        <header className="font-bold text-2xl px-2 lg:px-5 py-4 border-b">
          Who to follow
        </header>

        <main className="pt-2 px-2 lg:px-5">
          <div className="grid grid-cols-6">
            <div className="">
              <img
                src="https://picsum.photos/200/200"
                className="h-8 w-8 rounded-full"
              />
            </div>

            <Link
              href="/user/1"
              className="col-span-3 px-1 font-semibold flex flex-col"
            >
              <div className="text-sm"> Sangwa Albine </div>
              <div className="text-xm text-gray-700 font-light">
                {" "}
                @__svngwa._{" "}
              </div>
            </Link>

            <div className="col-span-2 py-2 justify-self-end">
              <button className=" text-blue-500 text-xs font-semibold text-md rounded-full py-1 px-4">
                .Follow
              </button>
            </div>
          </div>

          <div className="grid grid-cols-6 mt-6">
            <div className="">
              <img
                src="https://picsum.photos/200/200?i=200"
                className="h-8 w-8 rounded-full"
              />
            </div>

            <Link
              href="/user/1"
              className="col-span-3 px-1 font-semibold flex flex-col "
            >
              <div className="text-sm"> Mbonyintege </div>
              <div className="text-xm text-gray-700 font-light"> @Cpwr</div>
            </Link>

            <div className="col-span-2 py-2 justify-self-end">
              <button className=" text-blue-500 text-xs font-semibold text-md rounded-full py-1 px-4">
                .Follow
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserSuggestions;
