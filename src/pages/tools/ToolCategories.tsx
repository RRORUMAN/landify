
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Search,
  Star,
  Briefcase,
  Building2,
  BarChart3,
  PenTool,
  MonitorSmartphone,
  Paintbrush,
  Workflow,
  MessageSquare,
  Code,
  VideoIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface CategoryType {
  name: string;
  icon: any;
}

const categories: CategoryType[] = [
  { name: "Sales", icon: Briefcase },
  { name: "Back Office", icon: Building2 },
  { name: "Operations", icon: BarChart3 },
  { name: "Growth & Marketing", icon: Star },
  { name: "Writing & Editing", icon: PenTool },
  { name: "Technology & IT", icon: MonitorSmartphone },
  { name: "Design & Creative", icon: Paintbrush },
  { name: "Workflow Automation", icon: Workflow },
  { name: "Communication", icon: MessageSquare },
  { name: "Development", icon: Code },
  { name: "Media Production", icon: VideoIcon },
];

const ToolCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [favoriteTools, setFavoriteTools] = useState<Tool[]>([]);
  const [recentTools, setRecentTools] = useState<Tool[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data for the usage chart - replace with real data later
  const usageData = [
    { name: 'Mon', value: 4 },
    { name: 'Tue', value: 3 },
    { name: 'Wed', value: 5 },
    { name: 'Thu', value: 2 },
    { name: 'Fri', value: 6 },
    { name: 'Sat', value: 4 },
    { name: 'Sun', value: 3 },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/auth");
          return;
        }

        // Fetch tools
        const { data: toolsData, error: toolsError } = await supabase
          .from('tools')
          .select('*');

        if (toolsError) throw toolsError;

        // Fetch user interactions
        const { data: interactions, error: interactionsError } = await supabase
          .from('user_tool_interactions')
          .select('tool_id, is_favorite, last_viewed_at')
          .eq('user_id', user.id)
          .order('last_viewed_at', { ascending: false });

        if (interactionsError) throw interactionsError;

        if (toolsData) {
          setTools(toolsData);
          
          // Set favorite tools
          const favorites = toolsData.filter(tool => 
            interactions?.some(i => i.tool_id === tool.id && i.is_favorite)
          );
          setFavoriteTools(favorites);

          // Set recent tools
          const recents = toolsData.filter(tool =>
            interactions?.some(i => i.tool_id === tool.id)
          ).slice(0, 5);
          setRecentTools(recents);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch data. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, toast]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [tools, searchQuery, selectedCategory]);

  const toggleFavorite = async (toolId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: existing } = await supabase
        .from('user_tool_interactions')
        .select('is_favorite')
        .eq('user_id', user.id)
        .eq('tool_id', toolId)
        .single();

      if (existing) {
        await supabase
          .from('user_tool_interactions')
          .update({ is_favorite: !existing.is_favorite })
          .eq('user_id', user.id)
          .eq('tool_id', toolId);
      } else {
        await supabase
          .from('user_tool_interactions')
          .insert([
            { user_id: user.id, tool_id: toolId, is_favorite: true }
          ]);
      }

      // Refresh favorites
      const tool = tools.find(t => t.id === toolId);
      if (tool) {
        setFavoriteTools(prev => 
          prev.some(t => t.id === toolId) 
            ? prev.filter(t => t.id !== toolId)
            : [...prev, tool]
        );
      }

      toast({
        title: "Success",
        description: "Favorites updated successfully",
      });
    } catch (error) {
      console.error('Error updating favorite:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update favorites",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="flex">
        {/* Collapsible Sidebar */}
        <div
          className={`relative transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? "w-20" : "w-64"
          } bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-4 z-50 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>

          <ScrollArea className="h-screen px-4 py-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Categories */}
              <div className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Tooltip key={category.name}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={selectedCategory === category.name ? "default" : "ghost"}
                          className={`w-full justify-start gap-3 ${
                            isSidebarCollapsed ? "px-2" : "px-4"
                          }`}
                          onClick={() => setSelectedCategory(category.name)}
                        >
                          <Icon className="h-5 w-5" />
                          {!isSidebarCollapsed && <span>{category.name}</span>}
                        </Button>
                      </TooltipTrigger>
                      {isSidebarCollapsed && (
                        <TooltipContent side="right">
                          {category.name}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              Home
            </Button>
            <ChevronRight className="h-4 w-4" />
            <span>Tools</span>
            {selectedCategory && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span>{selectedCategory}</span>
              </>
            )}
          </div>

          {/* Usage Statistics */}
          <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Weekly Usage</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Favorites Section */}
          {favoriteTools.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                Favorites
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className="w-12 h-12 rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{tool.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {tool.category}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(tool.id)}
                      >
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Tools */}
          {recentTools.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Recently Viewed
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{tool.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {tool.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Tools */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">All Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                // Loading skeletons
                [...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="h-[200px] bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"
                  />
                ))
              ) : filteredTools.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    No tools found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className="w-12 h-12 rounded-lg group-hover:scale-105 transition-transform duration-200"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{tool.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {tool.category}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(tool.id)}
                      >
                        <Star
                          className={`h-5 w-5 ${
                            favoriteTools.some((t) => t.id === tool.id)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-400"
                          }`}
                        />
                      </Button>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCategories;
