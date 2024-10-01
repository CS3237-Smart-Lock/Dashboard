import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Navbar, NavbarButton } from "./components/NavBar";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import CameraPage from "@/pages/CameraPage";
import SettingsPage from "./pages/SettingsPage";

const NavbarContent = () => {
  return (
    <>
      <div className="flex gap-4">
        <Link to={"/"}>
          <NavbarButton text="Home" route="/" />
        </Link>
        <Link to="/camera">
          <NavbarButton text="Camera" route="/camera" />
        </Link>
        <Link to="/dashboard">
          <NavbarButton text="Dashboard" route="/dashboard" />
        </Link>
      </div>

      <Link to="/settings">
        <Avatar>
          <AvatarImage src="https://placehold.co/30" className="rounded-full" />
          <AvatarFallback>Profile</AvatarFallback>
        </Avatar>
      </Link>
    </>
  );
};
const App = () => {
  return (
    <Router>
      <Navbar>
        <NavbarContent />
      </Navbar>

      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/settings" element={<SettingsPage />} />h
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
