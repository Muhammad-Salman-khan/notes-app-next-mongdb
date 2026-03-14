import dbConnent from "@/lib/db";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnent();
  const { id }: { id: string } = await params;

  const data = await Note.findById(id);
  if (!data) {
    return NextResponse.json(
      { success: false, message: "Note not found" },
      { status: 404 },
    );
  }
  return NextResponse.json(
    {
      success: true,
      data: data,
    },
    { status: 200 },
  );
}
