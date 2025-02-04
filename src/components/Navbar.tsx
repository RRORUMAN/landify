import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/80 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
          >
            Relevence
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                "text-white/70 hover:text-white transition-colors",
                location.pathname === "/" && "text-white"
              )}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className={cn(
                "text-white/70 hover:text-white transition-colors",
                location.pathname === "/pricing" && "text-white"
              )}
            >
              Pricing
            </Link>
            <Link
              to="/tools"
              className={cn(
                "text-white/70 hover:text-white transition-colors",
                location.pathname === "/tools" && "text-white"
              )}
            >
              Tools
            </Link>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black transition-all ml-4"
              asChild
            >
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;