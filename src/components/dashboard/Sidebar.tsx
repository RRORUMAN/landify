
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Search, Plus, Scale, Brain, Sun, Moon, LogOut, BarChart3,
  Star, Clock, Keyboard, Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";

interface UserPreferences {
  theme: string;
  favorites: string[];
  recent_items: { id: string; name: string; path: string; timestamp: string; }[];
  custom_shortcuts: { id: string; name: string; path: string; icon: string; }[];
}

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userPrefs, setUserPrefs] = useState<UserPreferences>({
    theme: 'light',
    favorites: [],
    recent_items: [],
    custom_shortcuts: []
  });

  // Fetch user preferences on mount
  useEffect(() => {
    const fetchUserPreferences = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching preferences:', error);
        return;
      }

      if (data) {
        // Parse JSON fields and ensure they match the expected types
        const parsed: UserPreferences = {
          theme: data.theme || 'light',
          favorites: data.favorites || [],
          recent_items: Array.isArray(data.recent_items) ? data.recent_items : [],
          custom_shortcuts: Array.isArray(data.custom_shortcuts) ? data.custom_shortcuts : []
        };
        
        setUserPrefs(parsed);
        setIsDarkMode(parsed.theme === 'dark');
        if (parsed.theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      }
    };

    fetchUserPreferences();
  }, []);

  const menuItems = [
    {
      title: "Browse Tools",
      icon: Search,
      path: "/tools/categories",
      description: "Search and filter tools",
      isNew: false,
    },
    {
      title: "My Tools",
      icon: Plus,
      path: "/tools/add",
      description: "Manage your tools",
      isNew: false,
    },
    {
      title: "Compare",
      icon: Scale,
      path: "/tools/compare",
      description: "Compare tool features",
      isNew: false,
    },
    {
      title: "AI Suggestions",
      icon: Brain,
      path: "/tools/recommendations",
      description: "Get personalized recommendations",
      isNew: true,
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/tools/analytics",
      description: "Track spending and usage",
      isNew: true,
    },
  ];

  const toggleDarkMode = async () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!isDarkMode).toString());

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('user_preferences')
      .upsert({ 
        user_id: user.id,
        theme: newTheme
      });

    if (error) {
      toast({
        title: "Error saving theme preference",
        description: error.message,
        variant: "destructive",
      });
    }
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

  return (
    <aside className="min-h-screen w-80 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 p-6 relative transition-colors duration-300 flex flex-col">
      <div className="flex-1 space-y-8">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage tools
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Search */}
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              placeholder="Search tools, features..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            {searchQuery && (
              <CommandList>
                <CommandGroup heading="Tools">
                  {menuItems.filter(item => 
                    item.title.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map(item => (
                    <CommandItem
                      key={item.path}
                      onSelect={() => {
                        navigate(item.path);
                        setSearchQuery("");
                      }}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </Command>

          {/* Main Navigation */}
          <ScrollArea className="h-[300px]">
            <nav className="space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className={cn(
                    "group flex items-start gap-4 px-4 py-4 rounded-lg transition-all duration-300 relative overflow-hidden hover:shadow-sm",
                    location.pathname === item.path
                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  )}
                >
                  {item.isNew && (
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 dark:bg-blue-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 dark:bg-blue-400"></span>
                    </span>
                  )}
                  <item.icon className={cn(
                    "h-5 w-5 mt-0.5 transition-transform duration-300 group-hover:scale-110",
                    location.pathname === item.path
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                  )} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-none mb-1">{item.title}</span>
                    <span className={cn(
                      "text-xs transition-colors duration-300",
                      location.pathname === item.path
                        ? "text-blue-600/80 dark:text-blue-400/80"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                    )}>{item.description}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </ScrollArea>

          {/* Favorites */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 px-4">Favorites</h3>
            <nav className="space-y-1">
              {userPrefs.favorites.map((favorite) => (
                <Button
                  key={favorite}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-gray-600 dark:text-gray-300"
                >
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{favorite}</span>
                </Button>
              ))}
            </nav>
          </div>

          {/* Recent Items */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 px-4">Recent</h3>
            <nav className="space-y-1">
              {userPrefs.recent_items.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-gray-600 dark:text-gray-300"
                  onClick={() => navigate(item.path)}
                >
                  <Clock className="h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              ))}
            </nav>
          </div>

          {/* Custom Shortcuts */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 px-4">Shortcuts</h3>
            <nav className="space-y-1">
              {userPrefs.custom_shortcuts.map((shortcut) => (
                <Button
                  key={shortcut.id}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-gray-600 dark:text-gray-300"
                  onClick={() => navigate(shortcut.path)}
                >
                  <Keyboard className="h-4 w-4" />
                  <span>{shortcut.name}</span>
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-6 mt-auto">
        <Button
          variant="ghost"
          size="lg"
          onClick={toggleDarkMode}
          className="w-full justify-start gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={handleSignOut}
          className="w-full justify-start gap-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
