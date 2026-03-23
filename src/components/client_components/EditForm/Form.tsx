"use client";
import { UpdatePost } from "@/server/action";
import { useState } from "react";
import { toast } from "sonner";
import { createPostType, placeholders } from "../Full";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Edit2, Save, Loader2 } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!title || !content) {
        return toast.error("Fill all the fields");
      }
      setIsSubmitting(true);
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
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Glow effect */}
      <div className="relative">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/20 to-teal-500/20 blur-2xl opacity-60" />

        <div className="relative rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
          {/* Gradient top border */}
          <div className="h-2 bg-gradient-to-r from-blue-600 to-teal-500" />

          <div className="p-6 sm:p-8 md:p-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg">
                <Edit2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Edit Note
                </h2>
                <p className="text-sm text-muted-foreground">
                  Update your note content
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Title
                </label>
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Content
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note here..."
                  className="min-h-40 sm:min-h-56 resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !title || !content}
                  onClick={(e: any) => onSubmit(e)}
                  className="flex-1 gap-2 font-semibold bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ?
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  : <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
