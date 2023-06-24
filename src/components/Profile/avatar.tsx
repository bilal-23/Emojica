import { useGetProfileQuery } from "@/queries/profileQueries";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LoaderIcon } from "lucide-react";
import React from "react";

const ProfileAvatar = () => {
  const { isLoading, data } = useGetProfileQuery();
  // Merge first name and last name first letter
  const name = `${data?.firstName} ${data?.lastName}`
    .split(" ")
    .map((n) => n[0])
    .join("");

  if (!isLoading) {
    <Avatar>
      <LoaderIcon />
    </Avatar>;
  }
  return (
    <Avatar>
      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
