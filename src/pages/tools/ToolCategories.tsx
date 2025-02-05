
import { useState, useEffect, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
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
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";

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

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const { data, error } = await supabase
          .from('tools')
          .select('*');
        
        if (error) {
          console.error('Error fetching tools:', error);
          return;
        }

        if (data) {
          setTools(data as Tool[]);
        }
      } catch (error) {
        console.error('Error:', error);
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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Categories</h2>
            <div className="space-y-1">
              <Button
                variant={selectedCategory === null ? "default" : "ghost"}
                className={`w-full justify-start text-sm ${
                  selectedCategory === null 
                    ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                All Tools
              </Button>
              
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "ghost"}
                    className={`w-full justify-start text-sm ${
                      selectedCategory === category.name
                        ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Featured Tools */}
            {featuredTools.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No tools found matching your criteria.</p>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCategories;
