import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleFeaturesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/?section=features');
    } else {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.search === '?section=features') {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

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
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Relevence
          </Link>
          <div className="hidden md:flex items-center space-x-8">
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
            <Button
              variant="outline"
              className="bg-white text-black hover:bg-white/90 border-2 border-white font-medium transition-all"
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