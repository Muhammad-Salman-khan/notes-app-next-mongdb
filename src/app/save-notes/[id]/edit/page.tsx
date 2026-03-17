import Form from "@/components/client_components/EditForm/Form";
import { noteById } from "@/server/action";
import { notFound } from "next/navigation";
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
 const { id }: { id: string } = await params;
 const result = await noteById(id);
 if (!result.success || !result.data) {
  notFound();
 }
 const data = result.data;
 return (
  <>
   <div>
    <Form id={id} Title={data.title} Content={data.content} />
   </div>
  </>
 );
};

export default page;
