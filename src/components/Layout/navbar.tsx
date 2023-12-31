import React, { useEffect } from "react";
import { Icons } from "../UI/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBookmark,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useGetProfileQuery } from "@/queries/profileQueries";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { isLoading, data } = useGetProfileQuery();
  const [name, setName] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!data) return;
    let fallbackName = data.firstName.split("")[0] + data.lastName.split("")[0];
    setName(fallbackName);
  }, [data]);

  const handleLogout = async () => {
    await signOut();
    router.push("/auth");
    toast.success("Logged out successfully", { toastId: "logout" });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <nav className="bg-[#edf2f7] shadow lg:px-48 border-b sticky top-0 z-10 ">
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <Link href="/" className="flex-shrink-0 flex items-center gap-1">
              <Icons.logo className="mx-auto h-6 w-6" />
              <h1 className="text-2xl font-semibold tracking-tight">Emojica</h1>
            </Link>
          </div>
          <div className="flex-1 w-full flex items-center justify-center px-2 ">
            <form
              className=" w-full lg:max-w-xs max-w-xs"
              onSubmit={handleSearch}
            >
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-400 rounded-md leading-5
                   bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search"
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="hidden md:flex lg:ml-4 lg:flex lg:items-center">
            <div className="ml-2 relative flex items-center ">
              <DropdownMenu>
                <DropdownMenuTrigger
                  style={{ border: "none", outline: "none" }}
                >
                  <Avatar className="shadow-inner border-2">
                    <AvatarImage src={data?.pic} />
                    <AvatarFallback>{name}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Profile Menu</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex justify-between cursor-pointer">
                    <Link
                      href="/profile"
                      className=" w-full flex justify-between cursor-pointer"
                    >
                      My Profile
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ width: "15px", height: "15px" }}
                      />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex justify-between cursor-pointer">
                    <Link
                      href="/profile?bookmarks=true"
                      className=" w-full flex justify-between cursor-pointer"
                    >
                      Bookmarks{" "}
                      <FontAwesomeIcon
                        icon={faBookmark}
                        style={{ width: "15px", height: "15px" }}
                      />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex justify-between cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log Out{" "}
                    <FontAwesomeIcon
                      onClick={handleLogout}
                      icon={faRightFromBracket}
                      style={{ width: "15px", height: "15px" }}
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
