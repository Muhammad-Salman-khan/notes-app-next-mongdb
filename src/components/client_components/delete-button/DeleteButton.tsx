"use client";
import { Button } from "@/components/ui/button";
import DeletePostFunction from "@/helpers/DeleteFuntio";
import { useRouter } from "next/navigation";
const DeleteButton = ({ Id }: { Id: string }) => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          DeletePostFunction(Id!);
          setTimeout(() => {
            router.push("/save-notes");
          }, 1000);
        }}
        className="text-xs px-3 py-1.5 rounded-md border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
      >
        DeletePost
      </Button>
    </div>
  );
};

export default DeleteButton;
