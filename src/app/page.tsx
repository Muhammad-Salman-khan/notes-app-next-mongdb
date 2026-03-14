import SaveNotes from "@/components/client_components/Full";
import NotesCard from "@/components/meteors-demo";
import dbConnent from "@/lib/db";
import Note from "@/models/Note";
export type dataType = {
  _id?: string;
  key?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
export default async function Home() {
  let data;
  try {
    await dbConnent();
    const res = await Note.find({}).sort({ createdAt: -1 }).lean();
    if (!res) {
      throw new Error("Failed to fetch data ");
    }
    data = res;
  } catch (error: any) {
    console.error(error);
  }
  return (
    <>
      <div className="min-h-screen">
        <SaveNotes />
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <h2 className="font-extrabold text-2xl sm:text-4xl md:text-5xl text-center text-foreground">
            See your Recent Notes
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-6 max-w-8xl mx-auto">
          {data?.map(
            ({ _id, title, content, createdAt, updatedAt }: dataType) => (
              <NotesCard
                key={_id}
                title={title}
                content={content}
                createdAt={createdAt}
                updatedAt={updatedAt}
              />
            ),
          )}
        </div>
      </div>
    </>
  );
}
