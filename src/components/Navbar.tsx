import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import AuthButtons from "./navbar/AuthButtons";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsSignedIn(!!user);
    };
    checkUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (!isSignedIn) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isSignedIn]);

  // Don't render navbar on tools page when signed in
  if (location.pathname === '/tools' && isSignedIn) {
    return null;
  }

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#D3E4FD]/90 backdrop-blur-md py-4 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;