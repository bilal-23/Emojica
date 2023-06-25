import React from "react";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/font";
import Navbar from "./navbar";
import { useRouter } from "next/router";
import MobileNav from "./mobile-nav";
import { useSession } from "next-auth/react";
import { useGetProfileQuery } from "@/queries/profileQueries";

interface Props {
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { isLoading, isError, data } = useGetProfileQuery();

  return (
    <>
      <div
        className={cn(
          "min-h-screen bg-[#edf2f7] font-sans antialiased max-w-7xl mx-auto my-0",
          fontSans.variable
        )}
      >
        {router.pathname === "/auth" ? null : <Navbar />}
        {children}
      </div>
      {router.pathname === "/auth" ? null : <MobileNav />}
    </>
  );
};

export default Layout;
