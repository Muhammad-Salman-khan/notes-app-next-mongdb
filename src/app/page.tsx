import SaveNotes from "@/components/client_components/Full";
import NotesCard from "@/components/meteors-demo";
import { getAllData } from "@/server/action";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight, FileText } from "lucide-react";

export type dataType = {
  _id?: string;
  id?: string;
  key?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export default async function Home() {
  let data: any;
  try {
    const result = await getAllData();
    if (!result.success || !result.data) {
      toast.error("failed to get data");
      setTimeout(() => notFound(), 500);
    }
    data = result.data.splice(0, 3);
  } catch (error: any) {
    console.error(error);
  }

  return (
    <>
      <div className="min-h-screen">
        <SaveNotes Heading={`Save Any Notes!`} />

        {/* Recent Notes Section */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12">
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl bg-linear-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                  Recent Notes
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Your latest thoughts and ideas
                </p>
              </div>
              <Link
                href="/save-notes/"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                View All Notes
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {data?.length > 0 ?
                data?.map(
                  ({ _id, title, content, createdAt, updatedAt }: dataType) => (
                    <NotesCard
                      key={_id}
                      id={_id?.toString()}
                      title={title}
                      content={content}
                      createdAt={createdAt}
                      updatedAt={updatedAt}
                    />
                  ),
                )
              : /* Empty State */
                <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-24">
                  <div className="p-6 rounded-full bg-muted/50 mb-6">
                    <FileText className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-xl sm:text-2xl text-foreground mb-2">
                    No notes yet
                  </h3>
                  <p className="text-muted-foreground text-center text-sm sm:text-base max-w-md mb-6">
                    Start capturing your thoughts and ideas. Your notes will
                    appear here.
                  </p>
                </div>
              }
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
