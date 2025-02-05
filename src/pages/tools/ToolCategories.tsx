
import { useState, useEffect, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import {
  Search,
  Star,
  Code,
  PenTool,
  MonitorSmartphone,
  Paintbrush,
  Brain,
  BarChart3,
  Database,
  ClipboardList,
  MessageSquare,
  VideoIcon,
  Graduation,
  Heart,
  DollarSign,
  Palette,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface CategoryType {
  name: string;
  icon: any;
}

const categories: CategoryType[] = [
  { name: "Content Creation", icon: PenTool },
  { name: "Development", icon: Code },
  { name: "Design", icon: Paintbrush },
  { name: "Business Intelligence", icon: Brain },
  { name: "Sales & Marketing", icon: Star },
  { name: "Data Management", icon: Database },
  { name: "Project Management", icon: ClipboardList },
  { name: "Technology & IT", icon: MonitorSmartphone },
  { name: "Communication", icon: MessageSquare },
  { name: "Media Production", icon: VideoIcon },
  { name: "Analytics", icon: BarChart3 },
  { name: "Education & Learning", icon: Graduation },
  { name: "Healthcare & Wellness", icon: Heart },
  { name: "Financial Management", icon: DollarSign },
  { name: "Creative & Design", icon: Palette },
];

const ToolCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const { data, error } = await supabase
          .from('tools')
          .select('*')
          .order('featured', { ascending: false });
        
        if (error) {
          console.error('Error fetching tools:', error);
          toast({
            title: "Error",
            description: "Failed to load tools. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          setTools(data as Tool[]);
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, []);

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

  const featuredTools = useMemo(() => {
    return filteredTools.filter(tool => tool.featured);
  }, [filteredTools]);

  const regularTools = useMemo(() => {
    return filteredTools.filter(tool => !tool.featured);
  }, [filteredTools]);

  const categoryCount = useMemo(() => {
    return tools.reduce((acc, tool) => {
      acc[tool.category] = (acc[tool.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [tools]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            AI Tools Directory
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="backdrop-blur-md bg-white/70 rounded-xl p-6 shadow-lg border border-white/20 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Categories</h2>
                <div className="space-y-1 max-h-[600px] overflow-y-auto">
                  <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    className={`w-full justify-start text-sm transition-all duration-200 ${
                      selectedCategory === null 
                        ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Tools ({tools.length})
                  </Button>
                  
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const count = categoryCount[category.name] || 0;
                    return (
                      <Tooltip key={category.name}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={selectedCategory === category.name ? "default" : "ghost"}
                            className={`w-full justify-start text-sm transition-all duration-200 ${
                              selectedCategory === category.name
                                ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedCategory(category.name)}
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            <span className="flex-1 text-left">{category.name}</span>
                            <span className="text-xs text-gray-400">({count})</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View {category.name} tools ({count} tools)</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="backdrop-blur-md bg-white/70 rounded-xl p-6 shadow-lg border border-white/20"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search AI tools by name, category, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </motion.div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="backdrop-blur-md bg-white/70 rounded-xl p-6 shadow-lg border border-white/20">
                      <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Featured Tools */}
                  {featuredTools.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Tools</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence>
                          {featuredTools.map((tool) => (
                            <motion.div
                              key={tool.id}
                              layout
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ToolCard tool={tool} />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {/* Regular Tools */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      {selectedCategory || "All Tools"}
                      <span className="text-gray-500 text-lg ml-2">
                        ({regularTools.length} tools)
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnimatePresence>
                        {regularTools.map((tool) => (
                          <motion.div
                            key={tool.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ToolCard tool={tool} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {filteredTools.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <p className="text-gray-500">No tools found matching your criteria.</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory(null);
                          toast({
                            title: "Filters cleared",
                            description: "Showing all tools",
                          });
                        }}
                      >
                        Clear filters
                      </Button>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ToolCategories;
