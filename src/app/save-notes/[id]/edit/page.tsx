import Form from "@/components/client_components/EditForm/Form";
import { noteById } from "@/server/action";
import { notFound } from "next/navigation";
import { StepBack } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id }: { id: string } = await params;
  const result = await noteById(id);
  if (!result.success || !result.data) {
    notFound();
  }
  const data = result.data;

  return (
    <div className="relative min-h-screen">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/10 dark:from-primary/10 dark:via-background dark:to-secondary/5" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href={`/save-notes/${id}`}>
                <Button
                  variant="ghost"
                  className="text-sm font-semibold flex items-center gap-2 hover:bg-primary/10 transition-colors"
                >
                  <StepBack className="w-4 h-4" />
                  Back to Note
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 sm:py-12">
          <Form id={id} Title={data.title} Content={data.content} />
        </main>
      </div>
    </div>
  );
};

export default page;
