import { lockDoor, unlockDoor } from "@/api/api";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const ControlPage = () => {
  return (
    <div className="flex justify-center px-4 flex-col gap-4 mx-auto">
      <div className="flex justify-between gap-4">
        <h2 className="text-2xl">Control</h2>
        <div className="flex gap-4">
          <Button onClick={() => lockDoor()}>Lock</Button>
          <Button onClick={() => unlockDoor()}>Unlock</Button>
        </div>
      </div>

      <Separator />

      <h2 className="text-2xl">Camera</h2>
      <div className="border border-muted aspect-video h-2/3 text-center">
        Camera will be displayed here
      </div>

      <ScrollArea className="border border-muted rounded-lg h-40 p-4 font-mono">
        Logs will be displayed here
      </ScrollArea>
    </div>
  );
};

export default ControlPage;
