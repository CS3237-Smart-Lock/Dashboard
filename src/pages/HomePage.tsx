import ShimmerButton from "@/components/ui/shimmer-button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full flex justify-center align-middle flex-col gap-12">
      <p className="mx-auto">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b bg-clip-text text-center text-8xl font-semibold leading-none text-transparent from-white to-slate-900/10 ">
          Smart Lock (?)
        </span>
      </p>

      <div className="flex gap-10 mx-auto">
        <Link to={"/camera"}>
          <ShimmerButton>Camera</ShimmerButton>
        </Link>
        <Link to={"/dashboard"}>
          <ShimmerButton>Dashboard</ShimmerButton>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
