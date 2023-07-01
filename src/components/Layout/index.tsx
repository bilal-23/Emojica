import React from "react";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/font";
import Navbar from "./navbar";
import { useRouter } from "next/router";
import MobileNav from "./mobile-nav";
import Aside from "./Aside";
import UserSuggestions from "../Homepage/user-suggestions";

interface Props {
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      {router.pathname === "/auth" ? null : <Navbar />}
      <div
        className={cn(
          "min-h-screen flex justify-between z-100  lg:yp-24 py-0  bg-[#edf2f7] font-sans antialiased max-w-7xl mx-auto my-0 gap-2 ",
          fontSans.variable
        )}
      >
        {router.pathname === "/auth" || router.pathname === "/404" ? null : (
          <Aside />
        )}
        {children}
        {router.pathname === "/auth" || router.pathname === "/404" ? null : (
          <UserSuggestions />
        )}
      </div>
      {router.pathname === "/auth" ? null : <MobileNav />}
    </>
  );
};

export default Layout;
