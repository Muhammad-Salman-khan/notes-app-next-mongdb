import { noteById } from "@/server/action";
import { toast } from "sonner";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  let data: any;
  try {
    const { id } = await params;
    const result = await noteById(id);
    if (!result?.success) {
      throw new Error("failed to fetch Post");
    }
    data = result.data;
  } catch (error: any) {
    toast.error(`${error?.message}`);
    console.error(error);
  }
  console.log(data);

  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};

export default page;
