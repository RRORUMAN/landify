import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavLinks = () => {
  const location = useLocation();

  const handleFeaturesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/?section=features');
    } else {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Link
        to="/"
        className={cn(
          "text-white/70 hover:text-white transition-colors font-medium",
          location.pathname === "/" && "text-white"
        )}
      >
        Home
      </Link>
      <a
        href="#features"
        onClick={handleFeaturesClick}
        className="text-white/70 hover:text-white transition-colors font-medium cursor-pointer"
      >
        Features
      </a>
      <Link
        to="/pricing"
        className={cn(
          "text-white/70 hover:text-white transition-colors font-medium",
          location.pathname === "/pricing" && "text-white"
        )}
      >
        Pricing
      </Link>
      <Link
        to="/tools"
        className={cn(
          "text-white/70 hover:text-white transition-colors font-medium",
          location.pathname === "/tools" && "text-white"
        )}
      >
        Tools
      </Link>
    </>
  );
};

export default NavLinks;