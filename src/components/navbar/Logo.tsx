
import { Link } from "react-router-dom";
import { LandPlot } from "lucide-react";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
    >
      <LandPlot className="w-6 h-6 text-primary" strokeWidth={2.5} />
      <span className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent font-mono tracking-tight">
        Landify
      </span>
    </Link>
  );
};

export default Logo;

