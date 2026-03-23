"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { PostNote } from "@/server/action";
import { FileText, Sparkles, Loader2 } from "lucide-react";

export type createPostType = {
  title: string;
  content: string;
};

export const placeholders = [
  "Write a quick note before you forget...",
  "What's on your mind right now?",
  "Capture your brilliant ideas here...",
  "Jot down your thoughts...",
];

const SaveNotes = ({ Heading }: { Heading: string }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!title || !content) {
        return toast.error("Fill all the fields");
      }
      setLoading(true);
      const newPost: createPostType = {
        title,
        content,
      };
      const result = await PostNote(newPost);

      if (!result?.success) {
        return toast.error(`failed to Post`);
      }
      toast.success(`Post created successfully ${result.data.title}`);
      setTitle("");
      setContent("");
    } catch (error: any) {
      return toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10 dark:from-primary/10 dark:via-background dark:to-secondary/5" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl flex flex-col gap-8 relative z-10"
      >
        {/* Header with icon */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="p-4 rounded-2xl bg-linear-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 shadow-lg"
          >
            <FileText className="w-8 h-8 text-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-bold text-3xl sm:text-4xl md:text-5xl text-center bg-linear-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent"
          >
            {Heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-center text-sm sm:text-base max-w-md"
          >
            Capture your thoughts, ideas, and notes in a beautiful way
          </motion.p>
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-xl bg-card/50 dark:bg-card/30 rounded-3xl shadow-2xl border border-border/50 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-6">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />

            <div className="relative">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                className="min-h-40 sm:min-h-56 resize-none transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: content.length > 0 ? 1 : 0 }}
                className="absolute top-3 right-3 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
              >
                {content.length} chars
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                disabled={!content || !title || loading}
                type="submit"
                onClick={(e: any) => onSubmit(e)}
                className="w-full h-12 text-base font-semibold bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ?
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Note...</span>
                  </motion.div>
                : <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Save Note</span>
                  </motion.div>
                }
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SaveNotes;
