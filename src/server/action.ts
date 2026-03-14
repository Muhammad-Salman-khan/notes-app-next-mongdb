"use server";
import { createPostType } from "@/components/client_components/Full";
import dbConnent from "@/lib/db";
import Note from "@/models/Note";
import { revalidatePath } from "next/cache";

export const PostNote = async (data: createPostType) => {
  await dbConnent();
  const createdNote = await Note.create(data);
  revalidatePath("/");
  const notes = JSON.parse(JSON.stringify(createdNote));
  return { success: true, data: notes };
};
