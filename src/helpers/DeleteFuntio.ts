import { DeletePost } from "@/server/action";
import { toast } from "sonner";

const DeletePostFunction = async (id: string) => {
  try {
    const result = await DeletePost(id);
    if (!result?.success) {
      throw new Error("failed to delete Note");
    }
    toast.success(`Post deleted Successfully with the id: ${result.data._id}`);
  } catch (error: any) {
    console.error(error);
    return toast.error(
      `something went wrong while deleting the Note.${error?.message}`,
    );
  }
};
export default DeletePostFunction;
