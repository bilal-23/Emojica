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
import { Avatar, AvatarImage } from "../UI/avatar";

const avatars = [
  "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/pikachu_RVvSDjez36.png",
  "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/bullbasaur_Y85PdUY9me.png",
  "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/charmander_wymQBDZmjf.png",
  "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/eevee_UdoioiFjvy.png",
  "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/avatar_uZAJcosB-g.png",
  "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/meowth_V55QXMkA6u.png",
  "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/avatar__3__0FVtZ-e04.png",
  "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/avatar__2__EUz3ORKS9b.png",
  "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/abra_hHs9jcb40.png",
  "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/avatar__1__jCOnS8Osy.png",
];

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
  link: string;
  avatarImg: string;
}
const EditProfile: React.FC<Props> = ({
  firstName,
  lastName,
  email,
  username,
  bio,
  link,
  avatarImg,
}) => {
  const [profile, setProfile] = useState({
    firstName,
    lastName,
    email,
    username,
    bio,
    link,
    avatarImg,
  });
  const { isLoading, mutate } = useEditProfileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    mutate({ ...profile, pic: profile.avatarImg });
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
              <div className="grid grid-cols-5 justify-center justify-items-center items-center  sm:flex sm:justify-between flex-wrap">
                {avatars.map((item) => {
                  return (
                    <Avatar
                      className={`hover:scale-105 cursor-pointer transition-all duration-300 ${
                        profile.avatarImg === item
                          ? "border-red-500 border-2 scale-105"
                          : "border-2 border-transparent"
                      } flex justify-center items-center`}
                      onClick={() =>
                        setProfile({ ...profile, avatarImg: item })
                      }
                    >
                      <AvatarImage
                        src={item}
                        className="flex justify-center items-center"
                      />
                    </Avatar>
                  );
                })}
              </div>
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
