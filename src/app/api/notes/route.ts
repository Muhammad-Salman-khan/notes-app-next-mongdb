import dbConnent from "@/lib/db";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnent();
    const note = await Note.find({}).sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        data: note,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message,
      },
      { status: 400 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnent();
    const { title, content } = await req.json();
    if (!title || !content) {
      console.log(`Fill all the fields`);
      return NextResponse.json(
        {
          success: false,
          message: `fill all the fields`,
        },
        { status: 400 },
      );
    }
    const note = await Note.create({ title, content });
    return NextResponse.json(
      {
        success: true,
        data: note,
        message: `Note created Sucessfully`,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message,
      },
      { status: 500 },
    );
  }
}
