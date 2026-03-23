import NotesCard from "@/components/meteors-demo";
import { getNewData } from "@/server/action";
import { dataType } from "../page";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { FileText, PlusCircle } from "lucide-react";

const page = async () => {
  await connection();
  let data: any;
  try {
    const result = await getNewData();
    if (!result.success || !result.data) {
      notFound();
    }
    data = result.data;
  } catch (error: any) {
    console.error(`failed to fetch data, ${error}`);
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="bsolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10 dark:from-primary/10 dark:via-background dark:to-secondary/5" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-stone-600 to-teal-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <PlusCircle className="w-4 h-4" />
                Create New Note
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {data?.length > 0 ?
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map(
                ({ _id, title, content, createdAt, updatedAt }: dataType) => (
                  <NotesCard
                    id={_id?.toString()}
                    key={_id?.toString()}
                    title={title}
                    content={content}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                  />
                ),
              )}
            </div>
          : <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 flex items-center justify-center mb-6">
                <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="font-bold text-2xl sm:text-3xl text-foreground mb-2">
                No Notes Yet!
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Start capturing your ideas, thoughts, and important information
                by creating your first note.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <PlusCircle className="w-5 h-5" />
                Create Your First Note
              </Link>
            </div>
          }
        </main>
      </div>
    </div>
  );
};

export default page;
