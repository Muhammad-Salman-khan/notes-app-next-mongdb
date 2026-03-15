import SaveNotes from "@/components/client_components/Full";
import NotesCard from "@/components/meteors-demo";
import { getAllData } from "@/server/action";
import Link from "next/link";
import { toast } from "sonner";
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
    if (!result?.success) {
      toast.error("failed to get data");
    }
    data = result.data.splice(0, 3);
  } catch (error: any) {
    console.error(error);
  }
  return (
    <>
      <div className="min-h-screen">
        <SaveNotes />
        <div className="w-full flex flex-col text-center gap-2 md:flex-row md:items-center md:justify-between p-3 md:gap-6">
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
            See your Recent Notes
          </h2>
          <p className="text-sm sm:text-base font-extrabold whitespace-nowrap cursor-pointer shrink-0">
            <Link href={"/save-notes/"}>See all Notes</Link>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-6 max-w-8xl mx-auto">
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
          : <p>No Notes aviable</p>}
        </div>
      </div>
    </>
  );
}
