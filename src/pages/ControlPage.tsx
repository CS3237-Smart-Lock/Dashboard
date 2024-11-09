import { lockDoor, unlockDoor } from "@/api/api";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState, useRef } from "react";

const ControlPage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [liveLogs, setLiveLogs] = useState<string[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket("ws://192.168.205.75:12345/");
    }
    let isConnected = false;

    const ws = wsRef.current;

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      isConnected = true;
    };

    ws.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      if (jsonData.type === "command" && atob(jsonData.data) === "end") {
        setImageSrc(null);
        console.log("setting image to null");
      } else if (jsonData.type === "image") {
        setImageSrc(`data:image/jpg;base64, ${jsonData.data}`);
      } else if (jsonData.type === "log") {
        setLiveLogs((prevLogs) => [...prevLogs, atob(jsonData.data)]);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      isConnected = false;
    };

    // Cleanup WebSocket on component unmount
    return () => {
      if (isConnected && ws) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) scrollAreaRef.current.scrollIntoView(false);
  }, [liveLogs]);

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
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Live Camera Feed"
            className="w-full h-full object-cover"
          />
        ) : (
          "Currently no camera footage."
        )}
      </div>

      <ScrollArea className="border border-muted rounded-lg h-40 p-4 font-mono">
        <div ref={scrollAreaRef}>
          {liveLogs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ControlPage;
