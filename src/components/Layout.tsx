type LayoutProps = { children: React.ReactNode };

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen bg-background text-foreground">
      {children}
    </div>
  );
};
