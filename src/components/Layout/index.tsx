import React from "react";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/font";
import Navbar from "./navbar";
import { useRouter } from "next/router";
import MobileNav from "./mobile-nav";

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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </div>
      {router.pathname === "/auth" ? null : <MobileNav />}
    </>
  );
};

export default Layout;
