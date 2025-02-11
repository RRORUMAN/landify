
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogIn, LogOut } from "lucide-react";

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

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
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

  if (!isSignedIn) {
    return (
      <Button
        variant="outline"
        className="bg-blue-600 text-white hover:bg-blue-700 border-2 border-transparent font-medium transition-all rounded-full animate-fade-in flex items-center gap-2"
        asChild
      >
        <Link to="/auth">
          Sign In <LogIn className="w-4 h-4" />
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => navigate("/my-tools")}
        variant="outline"
        className="bg-white/80 hover:bg-white text-primary hover:text-primary/80 border-2 border-transparent font-medium transition-all rounded-full animate-fade-in"
      >
        Dashboard
      </Button>
      <Button
        variant="outline"
        className="bg-blue-600 text-white hover:bg-blue-700 border-2 border-transparent font-medium transition-all rounded-full animate-fade-in flex items-center gap-2"
        onClick={handleSignOut}
      >
        Sign Out <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default AuthButtons;
