import { createPostType } from "@/components/client_components/Full";
import { toast } from "sonner";

const fetchOrGetAnyData = async (
  url: string,
  method: string,
  Postdata: createPostType,
) => {
  try {
    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Postdata }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.message || "Something went wrong");
    }
    const data = await res.json();
    toast.success(`Note Created Succssfully, ${data.data.title}`);
    return data;
  } catch (error: any) {
    console.error(error);
    toast.error(`failed to create Note. ${error?.message}`);
  }
};
export default fetchOrGetAnyData;
