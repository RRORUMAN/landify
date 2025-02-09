
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Plus, Scale, Brain, Sun, Moon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

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

  const menuItems = [
    {
      title: "Browse Tools",
      icon: Search,
      path: "/tools/categories",
      description: "Search and filter tools",
    },
    {
      title: "My Tools",
      icon: Plus,
      path: "/my-tools",
      description: "Manage your tools",
    },
    {
      title: "Compare",
      icon: Scale,
      path: "/tools/compare",
      description: "Compare tool features",
    },
    {
      title: "AI Suggestions",
      icon: Brain,
      path: "/tools/recommendations",
      description: "Get personalized recommendations",
      isNew: true,
    },
  ];

  return (
    <aside className={cn(
      "min-h-screen w-80 border-r p-6 flex flex-col transition-colors duration-300",
      isDarkMode 
        ? "bg-[#0D1117] border-gray-800" 
        : "bg-white border-gray-200"
    )}>
      <div className="flex-1">
        <div className="flex items-center justify-between px-2 mb-8">
          <div>
            <h2 className={cn(
              "text-xl font-semibold mb-2",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Dashboard
            </h2>
            <p className="text-sm text-blue-500">
              Manage tools
            </p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={cn(
                "group flex items-start gap-4 px-4 py-3 rounded-lg transition-all duration-200 relative",
                location.pathname === item.path
                  ? "bg-blue-500/10 text-blue-500"
                  : isDarkMode 
                    ? "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              {item.isNew && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              )}
              <item.icon className={cn(
                "h-5 w-5 mt-0.5 transition-transform duration-200 group-hover:scale-110",
                location.pathname === item.path
                  ? "text-blue-500"
                  : isDarkMode
                    ? "text-gray-500 group-hover:text-gray-300"
                    : "text-gray-400 group-hover:text-gray-600"
              )} />
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none mb-1">{item.title}</span>
                <span className={cn(
                  "text-xs transition-colors duration-200",
                  location.pathname === item.path
                    ? "text-blue-500/80"
                    : isDarkMode
                      ? "text-gray-500 group-hover:text-gray-400"
                      : "text-gray-500 group-hover:text-gray-600"
                )}>{item.description}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className={cn(
        "pt-4 border-t mt-4 space-y-2",
        isDarkMode ? "border-gray-800" : "border-gray-200"
      )}>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className={cn(
            "w-full justify-start gap-3 text-sm",
            isDarkMode 
              ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          )}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className={cn(
            "w-full justify-start gap-3 text-sm",
            isDarkMode
              ? "text-red-400 hover:text-red-300 hover:bg-gray-800/50"
              : "text-red-500 hover:text-red-600 hover:bg-gray-100"
          )}
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
