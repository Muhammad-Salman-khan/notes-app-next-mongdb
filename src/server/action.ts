"use server";
import { createPostType } from "@/components/client_components/Full";
import dbConnent from "@/lib/db";
import Note from "@/models/Note";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

const serialize = (data: any) => JSON.parse(JSON.stringify(data));
export const getAllData = async () => {
  try {
    await dbConnent();
    const data = await Note.find({}).sort({ createdAt: -1 }).lean();
    return { success: true, data: serialize(data) };
  } catch (error: any) {
    console.error("[getAllData]", error);

    return { success: false, data: null };
  }
};
export const getNewData = async () => {
  try {
    await dbConnent();
    const data = await Note.find({}).sort({ createdAt: -1 }).lean();
    return { success: true, data: serialize(data) };
  } catch (error: any) {
    console.error("[getNewData]", error);

    return { success: false, data: null };
  }
};
export const noteById = async (id: string) => {
  try {
    if (!id?.trim()) {
      return { success: false, data: null };
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, data: null };
    }
    await dbConnent();
    const data = await Note.findById(id).lean();
    if (!data) {
      return { success: false, data: null };
    }
    return { success: true, data: serialize(data) };
  } catch (error: any) {
    console.error("[noteById]", error);
    return { success: false, data: null };
  }
};

export const PostNote = async (Data: createPostType) => {
  try {
    if (!Data.title?.trim() || !Data.content?.trim()) {
      return { success: false, data: null };
    }
    await dbConnent();
    const data = await Note.create(Data);
    revalidatePath("/");
    return { success: true, data: serialize(data) };
  } catch (error: any) {
    console.error("[PostNote]", error);
  }
};

export const DeletePost = async (id: string) => {
  try {
    await dbConnent();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, data: null };
    }
    const data = await Note.findByIdAndDelete(id).lean();
    if (!data) {
      return { success: false, data: null };
    }
    revalidatePath("/");
    return { success: true, data: serialize(data) };
  } catch (error: any) {
    console.error("[DeletePost]", error);
    return { success: false, data: null };
  }
};
export const UpdatePost = async (
  id: string,
  newData: Partial<createPostType>,
) => {
  try {
    if (!id?.trim()) {
      return { success: false, data: null };
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, data: null };
    }
    if (!newData?.title?.trim() || !newData?.content?.trim()) {
      return { success: false, data: null };
    }
    await dbConnent();
    const data = await Note.findByIdAndUpdate(id, newData, {
      returnDocument: "after",
      runValidators: true,
    }).lean();
    if (!data) {
      return { success: false, data: null };
    }
    revalidatePath("/");
    return { success: true, data: serialize(data) };
  } catch (error: any) {
    console.error("[UpdatePost]", error);

    return { success: false, data: null };
  }
};
