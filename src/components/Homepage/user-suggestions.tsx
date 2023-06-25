import React from "react";

const UserSuggestions = () => {
  return (
    <div className="hidden md:block lg:block py-8   sticky top-6">
      <div className="w-96 rounded-lg shadow border ">
        <header className="font-bold text-2xl px-5 py-4">Who to follow</header>

        <main className="px-5">
          <div className="grid grid-cols-6">
            <div className="">
              <img
                src="https://picsum.photos/200/200"
                className="h-8 w-8 rounded-full"
              />
            </div>

            <div className="col-span-3 px-1 font-semibold flex flex-col">
              <div className="text-sm"> Sangwa Albine </div>
              <div className="text-xm text-gray-700 font-light">
                {" "}
                @__svngwa._{" "}
              </div>
            </div>

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

            <div className="col-span-3 px-1 font-semibold flex flex-col ">
              <div className="text-sm"> Mbonyintege </div>
              <div className="text-xm text-gray-700 font-light"> @Cpwr</div>
            </div>

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
