"use client";
import { dataType } from "@/app/page";
import { Calendar } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import DeletePostFunction from "@/helpers/DeleteFuntio";

export default function NotesCard({
  key,
  id,
  _id,
  title,
  content,
  createdAt,
}: dataType) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date(createdAt));

  return (
    <div className="group relative max-w-3xl">
      <div className="absolute  inset-0 scale-[0.85] rounded-3xl bg-linear-to-r from-blue-600 to-teal-500 blur-2xl transition-all duration-500 group-hover:scale-95 group-hover:opacity-80 opacity-60" />
      <div className="relative flex h-full  rounded-2xl border border-border  flex-col justify-between overflow-hidden bg-card px-5 py-6 shadow-lg transition-transform duration-300 group-hover:-translate-y-1 sm:px-6 sm:py-7">
        {/* Date badge */}
        <div className="mb-4 flex items-center gap-2 w-fit rounded-full border border-border bg-muted px-3 py-1">
          <Calendar size={15} />
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
          <div>
            <Link href={`/save-notes/${id}/edit`}>
              <Button className="font-extrabold">Edit</Button>
            </Link>
            <Button onClick={() => DeletePostFunction(id!)}>Delete</Button>
          </div>
        </div>

        {/* Title */}
        <h2 className="relative z-10 mb-2 text-base font-semibold text-foreground leading-snug sm:text-lg line-clamp-1">
          {title}
        </h2>

        {/* Content */}
        <p className="relative z-10 mb-5 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {content}
        </p>
        <Link href={`/save-notes/${id}`}>
          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors group-hover:text-primary/80">
              Open note
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
