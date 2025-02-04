import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import {
  Grid,
  List,
  SlidersHorizontal,
  Loader2,
  ArrowUpDown,
  DollarSign,
  Star,
  Calendar,
  Bookmark
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/tools";
import { Badge } from "@/components/ui/badge";

type SortOption = "rating" | "reviews" | "bookmarks" | "newest" | "price";

const ToolCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPricing, setSelectedPricing] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

        // Transform the data to match the Tool type
        const transformedTools = data.map(tool => ({
          ...tool,
          visitUrl: tool.visit_url,
          dealUrl: tool.deal_url
        }));

        setTools(transformedTools);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, []);

  // Get unique tags from all tools
  const allTags = Array.from(
    new Set(tools.flatMap(tool => tool.tags))
  ).sort();

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    const matchesPricing = !selectedPricing || tool.pricing === selectedPricing;
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => tool.tags.includes(tag));

    return matchesSearch && matchesCategory && matchesPricing && matchesTags;
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      case "bookmarks":
        return b.bookmarks - a.bookmarks;
      case "newest":
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      case "price":
        const priceOrder = { "Free Trial": 0, "Freemium": 1, "Paid": 2 };
        return priceOrder[a.pricing as keyof typeof priceOrder] - 
               priceOrder[b.pricing as keyof typeof priceOrder];
      default:
        return 0;
    }
  });

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Browse AI Tools</h1>
        <p className="text-gray-600 dark:text-gray-300">Discover and explore AI tools by category</p>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={cn(
                "transition-colors duration-200",
                viewMode === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={cn(
                "transition-colors duration-200",
                viewMode === "list" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "transition-colors duration-200",
                showFilters ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Highest Rated</span>
                </div>
              </SelectItem>
              <SelectItem value="reviews">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Most Reviews</span>
                </div>
              </SelectItem>
              <SelectItem value="bookmarks">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span>Most Bookmarks</span>
                </div>
              </SelectItem>
              <SelectItem value="newest">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Newest First</span>
                </div>
              </SelectItem>
              <SelectItem value="price">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Price (Low to High)</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPricing || "all"} onValueChange={(value) => setSelectedPricing(value === "all" ? null : value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pricing</SelectItem>
              <SelectItem value="Free Trial">Free Trial</SelectItem>
              <SelectItem value="Freemium">Freemium</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1" />
          
          <p className="text-sm text-gray-500">
            {filteredTools.length} tools found
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleTagToggle(tag)}
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {showFilters && (
          <div className="lg:col-span-1 animate-slide-up">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        )}
        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No tools found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setSelectedPricing(null);
                  setSelectedTags([]);
                  setSortBy("rating");
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className={cn(
              "grid gap-6 animate-fade-in",
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2" 
                : "grid-cols-1"
            )}>
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCategories;