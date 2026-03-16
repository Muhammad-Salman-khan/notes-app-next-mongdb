"use client";
import { UpdatePost } from "@/server/action";
import { useState } from "react";
import { toast } from "sonner";
import { createPostType, placeholders } from "../Full";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const Form = ({
  id,
  Title,
  Content,
}: {
  id: string;
  Title: string;
  Content: string;
}) => {
  const router = useRouter();
  const [title, setTitle] = useState<string>(Title);
  const [content, setContent] = useState<string>(Content);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!title || !content) {
        return toast.error("Fill all the fields");
      }
      const newPost: createPostType = {
        title,
        content,
      };
      const result = await UpdatePost(id, newPost);
      setContent("");
      if (!result?.success) {
        return toast.error(`failed to Post`);
      }
      toast.success(`Post updated successfully ${result.data.title}`);
      router.push("/save-notes");
    } catch (error: any) {
      return toast.error(error);
    }
  };
  return (
    <>
      <div className="max-h-3/12 w-full flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <h2 className="font-extrabold text-2xl sm:text-4xl md:text-5xl text-center text-foreground">
            Edit Form
          </h2>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="min-h-40 sm:min-h-56 resize-none"
          />
          <Button type="submit" onClick={(e: any) => onSubmit(e)}>
            Save Note!
          </Button>
        </div>
      </div>
    </>
  );
};

export default Form;
