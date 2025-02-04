import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { Filter, Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
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
  const [subscriptionTier, setSubscriptionTier] = useState<string>("free");
  const [toolsLimit, setToolsLimit] = useState<number>(3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptionLimit = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: userTools } = await supabase
          .from("user_tools")
          .select("subscription_tier")
          .eq("user_id", user.id)
          .single();

        if (userTools?.subscription_tier) {
          setSubscriptionTier(userTools.subscription_tier);
          
          const { data: limits } = await supabase
            .from("subscription_limits")
            .select("tools_per_category")
            .eq("tier", userTools.subscription_tier)
            .single();

          if (limits) {
            setToolsLimit(limits.tools_per_category);
          }
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
      }
    };

    fetchSubscriptionLimit();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

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

  const limitedTools = filteredTools.slice(0, toolsLimit);
  const featuredTools = limitedTools.filter((tool) => tool.featured);
  const regularTools = limitedTools.filter((tool) => !tool.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Relevence
          </h1>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/my-tools")}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              My Tools
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
        
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
                  <Button variant="outline" className="gap-2 text-white border-white hover:bg-white hover:text-black">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setPriceFilter(null)}>
                    All Prices
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceFilter("Free Trial")}>
                    Free Trial
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
                  <Button variant="outline" className="gap-2 text-white border-white hover:bg-white hover:text-black">
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
                <p className="text-gray-400">No tools found matching your criteria.</p>
              </div>
            )}

            {filteredTools.length > toolsLimit && (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">
                  Upgrade your plan to see more tools in each category
                </p>
                <Button
                  onClick={() => navigate("/")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Upgrade Now
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;