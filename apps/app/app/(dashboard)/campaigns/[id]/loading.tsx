import { Skeleton } from "@workspace/ui/components/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";

export default function Loading() {
  return (
    <div className="container max-w-[1400px] mx-auto">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Campaign</h1>
          <p className="text-sm text-muted-foreground">
            Make changes to your campaign
          </p>
        </div>

        <Tabs defaultValue="write">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write" className="mt-4">
            <div className="space-y-4">
              <Skeleton className="h-10 w-full max-w-[600px]" />
              <Skeleton className="h-[400px] w-full" />
            </div>
          </TabsContent>
          <TabsContent value="preview" className="mt-4">
            <Skeleton className="h-[600px] w-full max-w-2xl mx-auto" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 