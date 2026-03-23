"use client";
import { dataType } from "@/app/page";
import { Calendar, Edit2, Trash2, ArrowRight } from "lucide-react";
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
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(createdAt));

  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-teal-500/20 blur-xl transition-all duration-500 group-hover:from-blue-600/40 group-hover:to-teal-500/40 group-hover:scale-105" />

      <div className="relative h-full rounded-2xl border border-border bg-card overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* Gradient top border */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 to-teal-500" />

        <div className="p-5 flex flex-col h-full">
          {/* Header with date and actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Link href={`/save-notes/${id}/edit`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900"
                >
                  <Edit2 className="w-4 h-4 text-blue-600" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => DeletePostFunction(id!)}
                className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h2>

          {/* Content */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-grow">
            {content}
          </p>

          {/* Footer with CTA */}
          <Link href={`/save-notes/${id}`} className="mt-auto">
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-blue-600 transition-colors">
                Read Note
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
