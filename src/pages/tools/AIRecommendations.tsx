
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ToolCard from "@/components/ToolCard";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tool } from "@/data/types";
import { Loader2, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";

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
      const { data: aiData, error: aiError } = await supabase.rpc(
        'generate_tool_recommendations',
        { 
          p_user_id: userAuth?.id || '',
          p_query: userNeeds,
          p_limit: 5
        }
      );

      if (aiError) throw aiError;

      // Store the recommendation results for analytics
      await supabase.from('ai_recommendation_results').insert({
        user_id: userAuth?.id,
        query: userNeeds,
        results: aiData,
        match_scores: aiData.reduce((acc: Record<string, number>, tool: any) => {
          acc[tool.tool_id] = tool.score || 0;
          return acc;
        }, {}),
        use_case_fit: {
          description: userNeeds,
          timestamp: new Date().toISOString(),
          query_context: userNeeds
        }
      });

      const toolRecommendations: Tool[] = aiData?.map((rec: any) => ({
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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Tool Recommendations</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Get personalized AI tool suggestions based on your specific needs and use cases.
        </p>
      </div>

      <Card className="p-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Describe your needs
            </label>
            <Textarea
              value={userNeeds}
              onChange={(e) => setUserNeeds(e.target.value)}
              placeholder="What kind of AI tool are you looking for? Describe your use case, requirements, and any specific features you need..."
              className="h-32"
            />
          </div>

          <Button
            onClick={handleGetRecommendations}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing your needs...
              </>
            ) : (
              'Get AI Recommendations'
            )}
          </Button>
        </div>
      </Card>

      {recommendations.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Recommended Tools for You
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {recommendations.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
