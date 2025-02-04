import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthButtons = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsSignedIn(!!user);
    };
    checkUser();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate("/");
    }
  };

  return isSignedIn ? (
    <Button
      variant="outline"
      className="bg-white text-black hover:bg-white/90 border-2 border-white font-medium transition-all"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  ) : (
    <Button
      variant="outline"
      className="bg-white text-black hover:bg-white/90 border-2 border-white font-medium transition-all"
      asChild
    >
      <Link to="/auth">Sign In</Link>
    </Button>
  );
};

export default AuthButtons;