import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../UI/dialog";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEditProfileMutation } from "@/queries/profileQueries";
import { Loader } from "../UI/loader";
import { Love_Light } from "next/font/google";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
  link: string;
}
const EditProfile: React.FC<Props> = ({
  firstName,
  lastName,
  email,
  username,
  bio,
  link,
}) => {
  const [profile, setProfile] = useState({
    firstName,
    lastName,
    email,
    username,
    bio,
    link,
  });
  const { isLoading, mutate } = useEditProfileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    mutate(profile);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Dialog>
        <DialogTrigger
          className="bg-blue-500 px-2 py-1 w-full xs:w-1/4
                      text-white font-semibold text-sm rounded block text-center 
                      sm:inline-block "
        >
          Edit
        </DialogTrigger>
        <DialogContent className="rounded-lg mx-auto w-[90%] flex flex-col gap-2">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription className="mt-[50px] flex flex-col gap-5">
              You can update your name, bio and link.
              <Input
                placeholder="First Name"
                value={profile.firstName}
                name="firstName"
                onChange={handleChange}
              />
              <Input
                placeholder="Last Name"
                value={profile.lastName}
                name="lastName"
                onChange={handleChange}
              />
              <Input placeholder="Email" value={profile.email} disabled />
              <Input placeholder="Username" value={profile.username} disabled />
              <Input
                placeholder="Bio"
                value={profile.bio}
                name="bio"
                onChange={handleChange}
              />
              <Input
                placeholder="Link"
                value={profile.link}
                name="link"
                onChange={handleChange}
              />
            </DialogDescription>
            <DialogFooter>
              <DialogClose className="w-full">
                <Button type="button" onClick={handleSubmit} className="w-full">
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfile;
