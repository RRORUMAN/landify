import { useState, useEffect, useMemo } from "react";
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
  Bookmark,
  X,
  Tags,
  Filter
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
import type { Tool } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type SortOption = "rating" | "reviews" | "bookmarks" | "newest" | "price";
type PricingFilter = "all" | "Free Trial" | "Freemium" | "Paid";
type RatingFilter = "all" | "4+" | "4.5+" | "4.8+";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: "Free Trial" | "Freemium" | "Paid";
  rating: number;
  reviews: number;
  bookmarks: number;
  tags: string[];
  logo: string;
  featured?: boolean;
  visit_url: string;
  dealUrl?: string;
  created_at?: string;
}

const ToolCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPricing, setSelectedPricing] = useState<PricingFilter>("all");
  const [selectedRating, setSelectedRating] = useState<RatingFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);

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

  const allTags = useMemo(() => {
    const tags = Array.from(new Set(tools.flatMap(tool => tool.tags)));
    return tags.sort((a, b) => {
      // Sort by frequency first
      const freqA = tools.filter(tool => tool.tags.includes(a)).length;
      const freqB = tools.filter(tool => tool.tags.includes(b)).length;
      if (freqB !== freqA) {
        return freqB - freqA;
      }
      // If frequencies are equal, sort alphabetically
      return a.localeCompare(b);
    });
  }, [tools]);

  const visibleTags = showAllTags ? allTags : allTags.slice(0, 15);

  const getRatingThreshold = (filter: RatingFilter): number => {
    switch (filter) {
      case "4+": return 4;
      case "4.5+": return 4.5;
      case "4.8+": return 4.8;
      default: return 0;
    }
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      const matchesPricing = selectedPricing === "all" || tool.pricing === selectedPricing;
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => tool.tags.includes(tag));
      const matchesRating = selectedRating === "all" || 
        tool.rating >= getRatingThreshold(selectedRating);

      return matchesSearch && matchesCategory && matchesPricing && matchesTags && matchesRating;
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
  }, [tools, searchQuery, selectedCategory, selectedPricing, selectedTags, selectedRating, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedPricing("all");
    setSelectedRating("all");
    setSelectedTags([]);
    setSortBy("rating");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Browse AI Tools</h1>
        <p className="text-gray-600">Discover and explore AI tools by category</p>
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

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="filters">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters & Sorting</span>
                {(selectedPricing !== "all" || selectedRating !== "all" || selectedTags.length > 0) && (
                  <Badge variant="secondary" className="ml-2">
                    {[
                      selectedPricing !== "all" && "Price",
                      selectedRating !== "all" && "Rating",
                      selectedTags.length > 0 && `Tags (${selectedTags.length})`
                    ].filter(Boolean).join(", ")}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Sort by</label>
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger>
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
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
                  <Select value={selectedPricing} onValueChange={(value) => setSelectedPricing(value as PricingFilter)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pricing</SelectItem>
                      <SelectItem value="Free Trial">Free Trial</SelectItem>
                      <SelectItem value="Freemium">Freemium</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Rating</label>
                  <Select value={selectedRating} onValueChange={(value) => setSelectedRating(value as RatingFilter)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Minimum Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4+">4+ Stars</SelectItem>
                      <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                      <SelectItem value="4.8+">4.8+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Popular Tags</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllTags(!showAllTags)}
                    className="text-blue-600 hover:text-blue-700 text-xs h-6"
                  >
                    {showAllTags ? "Show Less" : "Show All"}
                  </Button>
                </div>
                <ScrollArea className="h-24">
                  <div className="flex flex-wrap gap-1.5">
                    {visibleTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer text-xs py-0.5"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                        <span className="ml-1 text-xs opacity-60">
                          ({tools.filter(tool => tool.tags.includes(tag)).length})
                        </span>
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {(selectedTags.length > 0 || selectedPricing !== "all" || selectedRating !== "all") && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-500">Active filters:</span>
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="pl-2 pr-1 py-0.5 flex items-center gap-1 text-xs"
              >
                {tag}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 hover:bg-gray-200 rounded-full"
                  onClick={() => clearTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {selectedPricing !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Price: {selectedPricing}
              </Badge>
            )}
            {selectedRating !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Rating: {selectedRating}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 text-xs h-6"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {filteredTools.length} tools found
          </p>
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
                onClick={clearAllFilters}
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
