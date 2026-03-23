import DeleteButton from "@/components/client_components/delete-button/DeleteButton";
import { Button } from "@/components/ui/button";
import { noteById } from "@/server/action";
import { StepBack, Calendar, Edit2, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const result = await noteById(id);
  if (!result.success || !result.data) {
    notFound();
  }
  const data = result.data;

  const formattedDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  const Id = data._id?.toString();

  return (
    <div className="relative min-h-screen">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/10 dark:from-primary/10 dark:via-background dark:to-secondary/5" />
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Link href={`/save-notes/`}>
              <Button
                variant="ghost"
                className="text-sm font-semibold flex items-center gap-2 hover:bg-primary/10 transition-colors"
              >
                <StepBack className="w-4 h-4" />
                Back to Notes
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Note Card */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/20 to-teal-500/20 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              <div className="relative rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
                {/* Gradient top border */}
                <div className="h-2 bg-gradient-to-r from-blue-600 to-teal-500" />

                <div className="p-6 sm:p-8 md:p-10">
                  {/* Title and Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg shrink-0">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight break-words">
                        {data.title}
                      </h1>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Link href={`/save-notes/${id}/edit`}>
                        <Button className="gap-2 font-semibold bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-lg">
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>
                      </Link>
                      <DeleteButton Id={Id} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="border-t border-border/50 pt-8 mb-8">
                    <p className="text-base sm:text-lg leading-relaxed text-foreground whitespace-pre-wrap break-words">
                      {data.content}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border/50">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Created
                        </p>
                        <p className="text-sm font-semibold">
                          {formattedDate(data.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                      <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900">
                        <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Last Updated
                        </p>
                        <p className="text-sm font-semibold">
                          {formattedDate(data.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
