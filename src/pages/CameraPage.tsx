import { ScrollArea } from "@/components/ui/scroll-area";

const CameraPage = () => {
  return (
    <div className="flex justify-center px-40 flex-col gap-10">
      <div className="border border-muted aspect-video h-2/3 text-center">
        Camera will be displayed here
      </div>

      <ScrollArea className="border border-muted rounded-lg h-40 p-4 font-mono">
        Logs will be displayed here
      </ScrollArea>
    </div>
  );
};

export default CameraPage;
