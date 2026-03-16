import DeleteButton from "@/components/client_components/delete-button/DeleteButton";
import { Button } from "@/components/ui/button";
import DeletePostFunction from "@/helpers/DeleteFuntio";
import { noteById } from "@/server/action";
import { StepBack } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toast } from "sonner";

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
      month: "numeric",
      year: "numeric",
    }).format(new Date(date));
  const Id = data._id?.toString();

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href={`/save-notes/`}>
          <Button className="text-sm  mb-8 font-extrabold flex items-center gap-1  transition-colors">
            <StepBack /> back to notes
          </Button>
        </Link>

        <div className="border rounded-xl p-8 bg-background">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-2xl font-medium">{data.title}</h1>
            <div className="flex gap-2 shrink-0">
              <Link href={`/save-notes/${id}/edit`}>
                <Button className="text-xs px-3 font-extrabold py-1.5 rounded-md border ">
                  Edit
                </Button>
              </Link>
              <DeleteButton Id={Id} />
            </div>
          </div>

          <div className="border-t pt-6 mb-6">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {data.content}
            </p>
          </div>

          <div className="border-t pt-4 flex justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">created</p>
              <p className="text-sm">{formattedDate(data.createdAt)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">last updated</p>
              <p className="text-sm">{formattedDate(data.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
