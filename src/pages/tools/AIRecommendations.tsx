
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ToolCard from "@/components/ToolCard";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tool } from "@/data/types";
import { Loader2 } from "lucide-react";

const AIRecommendations = () => {
  const [userNeeds, setUserNeeds] = useState("");
  const [recommendations, setRecommendations] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userAuth = useUser();
  const { toast } = useToast();

  const handleGetRecommendations = async () => {
    if (!userNeeds.trim()) {
      toast({
        title: "Please describe your needs",
        description: "Tell us what kind of AI tool you're looking for",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc(
        'generate_tool_recommendations',
        { 
          p_user_id: userAuth?.id || '',
          p_query: userNeeds,
          p_limit: 5
        }
      );

      if (error) throw error;

      const toolRecommendations: Tool[] = data?.map((rec: any) => ({
        id: rec.tool_id,
        name: rec.name,
        description: rec.description,
        logo: rec.logo,
        visit_url: rec.visit_url,
        tags: rec.tags || [],
        rating: rec.score || 0,
        reviews: rec.reviews || 0,
        bookmarks: rec.bookmarks || 0,
        pricing: rec.pricing || 'Free',
        category: rec.category || 'AI',
        featured: rec.featured || false,
        trending_tools: rec.trending_tools || [],
      })) || [];

      setRecommendations(toolRecommendations);

      toast({
        title: "Recommendations ready!",
        description: `Found ${toolRecommendations.length} tools matching your needs`,
      });
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast({
        title: "Error getting recommendations",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Tool Recommendations</h1>
        <p className="text-gray-600">Get personalized AI tool suggestions based on your needs</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your needs
          </label>
          <Textarea
            value={userNeeds}
            onChange={(e) => setUserNeeds(e.target.value)}
            placeholder="What kind of AI tool are you looking for? Describe your use case..."
            className="h-32"
          />
        </div>

        <Button
          onClick={handleGetRecommendations}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Recommendations...
            </>
          ) : (
            'Get Recommendations'
          )}
        </Button>

        {recommendations.length > 0 && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Recommended Tools</h2>
            {recommendations.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendations;
