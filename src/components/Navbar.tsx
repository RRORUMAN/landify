
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import AuthButtons from "./navbar/AuthButtons";

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

  // Only show navbar on landing, features, and pricing pages
  const showNavbar = ['/', '/features', '/pricing'].includes(location.pathname);
  
  if (!showNavbar) {
    return null;
  }

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/90 backdrop-blur-md py-4 shadow-lg"
          : "bg-gradient-to-r from-blue-600/20 via-purple-500/20 to-blue-600/20 backdrop-blur-sm py-6 animate-gradient"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex items-center space-x-8 animate-fade-in">
            <NavLinks />
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
