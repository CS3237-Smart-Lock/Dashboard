import { useLocation } from "react-router-dom";

type NavbarButtonProps = {
  text: string;
  route: string;
};

export const NavbarButton = ({ text, route }: NavbarButtonProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <button
      className={
        currentPath === route
          ? "text-sm font-medium text-foreground"
          : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      }
    >
      {text}
    </button>
  );
};

type NavBarProps = {
  children: React.ReactNode;
};

export const Navbar = ({ children }: NavBarProps) => {
  return (
    <nav className="px-4 py-3 border-b border-b-neutral-800 flex justify-between items-center fixed w-screen z-10 bg-background">
      {children}
    </nav>
  );
};
