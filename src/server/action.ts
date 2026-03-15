"use server";
import { dataType } from "@/app/page";
import { createPostType } from "@/components/client_components/Full";
import dbConnent from "@/lib/db";
import Note from "@/models/Note";
import { revalidatePath } from "next/cache";
export const getAllData = async () => {
  await dbConnent();
  const getData = await Note.find({}).sort({ createdAt: -1 }).lean();
  revalidatePath("/");
  const data = getData;
  return { success: true, data: data };
};
export const noteById = async (id: string) => {
  await dbConnent();
  const getData = await Note.findById(id).lean();
  const data = getData;
  return { success: true, data: data };
};

export const PostNote = async (data: createPostType) => {
  await dbConnent();
  const createdNote = await Note.create(data);
  revalidatePath("/");
  const notes = JSON.parse(JSON.stringify(createdNote));
  return { success: true, data: notes };
};

export const DeletePost = async (id: string) => {
  try {
    await dbConnent();
    const result = await Note.findByIdAndDelete(id).lean();
    const notes = JSON.parse(JSON.stringify(result));
    revalidatePath("/");
    return { success: true, data: notes };
  } catch (error: any) {
    console.error(error);
  }
};
export const UpdatePost = async (id: string, newData: Partial<dataType>) => {
  try {
    await dbConnent();
    const result = await Note.findByIdAndUpdate(id, newData, {
      new: true,
    }).lean();
    const notes = JSON.parse(JSON.stringify(result));
    revalidatePath("/");
    return { success: true, data: notes };
  } catch (error: any) {
    console.error(error);
  }
};
