import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../UI/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../UI/Button";

interface Props {
  createPost: ({ content }: { content: string }) => void;
}

const CreatePostModal: React.FC<Props> = ({ createPost }) => {
  const [message, setMessage] = useState("");
  const handleEditPost = async (e: any) => {
    e.preventDefault();
    setMessage("");
    createPost({ content: message });
  };

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

export default CreatePostModal;
