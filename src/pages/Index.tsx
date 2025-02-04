import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"popularity" | "rating" | null>(null);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    const matchesPrice = !priceFilter || tool.pricing === priceFilter;

    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "popularity") return b.bookmarks - a.bookmarks;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const featuredTools = filteredTools.filter((tool) => tool.featured);
  const regularTools = filteredTools.filter((tool) => !tool.featured);

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8 text-left">Relevence</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </aside>

          <main className="lg:col-span-3">
            <div className="flex gap-4 mb-8">
              <div className="flex-1">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setPriceFilter(null)}>
                    All Prices
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceFilter("Free")}>
                    Free
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceFilter("Paid")}>
                    Paid
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceFilter("Freemium")}>
                    Freemium
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Sort By
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSortBy(null)}>
                    Default
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popularity")}>
                    Most Popular
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    Highest Rated
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {featuredTools.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-xl font-semibold">Featured Tools</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-6">All Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regularTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No tools found matching your criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;