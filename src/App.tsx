import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Navbar, NavbarButton } from "./components/NavBar";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import ControlPage from "./pages/ControlPage";

const NavbarContent = () => {
  return (
    <>
      <div className="flex gap-4">
        <Link to={"/"}>
          <NavbarButton text="Home" route="/" />
        </Link>
        <Link to="/control">
          <NavbarButton text="Control" route="/control" />
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
          <Route path="/control" element={<ControlPage />} />
          <Route path="/settings" element={<SettingsPage />} />h
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
