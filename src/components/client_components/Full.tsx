"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";

const SaveNotes = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const placeholders = [
    "Write a quick note before you forget...",
    "What's on your mind right now?",
    "Tip: Use titles like 'Meeting – Mar 13' to find notes faster.",
    "Jot down that idea you've been sitting on.",
    "Tip: Keep descriptions short — one thought per note.",
    "What do you need to remember tomorrow?",
    "Tip: Star important notes so they stay at the top.",
    "Summarize today in one sentence.",
    "What problem are you trying to solve?",
    "Tip: Write the title first — it helps you think clearly.",
  ];
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content) {
      return toast.error("Fill all the fields");
    }
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || "Something went wrong");
      }
      const data = await res.json();
      console.log();
      toast.success(`Note Created Succssfully, ${data.data.title}`);
      setTitle("");
      setContent("");
    } catch (error: any) {
      console.error(error);
      toast.error(`failed to create Note. ${error?.message}`);
    }
  };

  return (
    <div className="max-h-3/12 w-full flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <h2 className="font-extrabold text-2xl sm:text-4xl md:text-5xl text-center text-foreground">
          Save Any Notes!
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
          Save Note
        </Button>
      </div>
    </div>
  );
};

export default SaveNotes;
