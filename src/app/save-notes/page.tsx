import NotesCard from "@/components/meteors-demo";
import dbConnent from "@/lib/db";
import { getAllData } from "@/server/action";
import { toast } from "sonner";
import { dataType } from "../page";
import Link from "next/link";

const page = async () => {
  let data: any;
  try {
    await dbConnent();
    const result = await getAllData();
    if (!result?.success) {
      toast.error(`failed to fetch data`);
    }
    data = result.data;
  } catch (error: any) {
    console.error(error);
    toast.error(`failed to fetch data, ${error?.message}`);
  }
  return (
    <>
      <div className="min-h-screen">
        <div className="w-full flex flex-col p-4  text-center gap-2 md:flex-row md:items-center md:justify-between md:gap-6">
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
            See your All Notes
          </h2>
          <p className="text-sm sm:text-base font-extrabold whitespace-nowrap cursor-pointer shrink-0">
            <Link href={"/"}>Create Notes!</Link>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-6 max-w-8xl mx-auto">
          {data.length > 0 ?
            data?.map(
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
            )
          : <p> No Notes aviable</p>}
        </div>
      </div>
    </>
  );
};

export default page;
