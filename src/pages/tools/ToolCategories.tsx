
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";
import { toast } from "@/hooks/use-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import SearchBar from "@/components/tools/SearchBar";
import CategorySidebar from "@/components/tools/CategorySidebar";
import ToolGrid from "@/components/tools/ToolGrid";

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

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    toast({
      title: "Filters cleared",
      description: "Showing all tools",
    });
  };

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
              <CategorySidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categoryCount={categoryCount}
                totalTools={tools.length}
              />
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </motion.div>

              <ToolGrid
                isLoading={isLoading}
                featuredTools={featuredTools}
                regularTools={regularTools}
                selectedCategory={selectedCategory}
                filteredTools={filteredTools}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ToolCategories;
