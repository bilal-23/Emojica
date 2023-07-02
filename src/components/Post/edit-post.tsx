import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import { Button } from "../UI/Button";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleEditPost: () => void;
}
const EditPost: React.FC<Props> = ({ message, setMessage, handleEditPost }) => {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              placeholder="Type something..."
              className=" focus:outline-none  w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
            ></textarea>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleEditPost}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default EditPost;
