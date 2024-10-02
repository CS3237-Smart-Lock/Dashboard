import { Toaster } from "./ui/toaster";

type LayoutProps = { children: React.ReactNode };

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen bg-background text-foreground flex pt-20 p-8">
      {children}
      <Toaster />
    </div>
  );
};
