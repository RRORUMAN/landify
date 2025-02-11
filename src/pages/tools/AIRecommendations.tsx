
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ToolCard from "@/components/ToolCard";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tool } from "@/data/types";
import { Loader2, Brain, Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const AIRecommendations = () => {
  const [userNeeds, setUserNeeds] = useState("");
  const [recommendations, setRecommendations] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
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
      const { data: suggestionsData, error: suggestionsError } = await supabase
        .rpc('generate_tool_recommendations', {
          p_user_id: userAuth?.id,
          p_query: userNeeds,
          p_limit: 5
        });

      if (suggestionsError) throw suggestionsError;

      if (Array.isArray(suggestionsData)) {
        const toolRecommendations = suggestionsData.map((rec) => ({
          id: rec.tool_id,
          name: rec.name,
          description: rec.description,
          logo: rec.logo || 'https://via.placeholder.com/60',
          visit_url: rec.visit_url || '#',
          tags: rec.tags || [],
          rating: rec.score || 0,
          reviews: 0,
          bookmarks: 0,
          pricing: 'Free',
          category: rec.category,
          featured: false,
        }));

        setRecommendations(toolRecommendations);

        if (toolRecommendations.length === 0) {
          toast({
            title: "No matches found",
            description: "Try broadening your search or using different keywords",
            variant: "default",
          });
        } else {
          toast({
            title: "Recommendations ready!",
            description: `Found ${toolRecommendations.length} tools matching your needs`,
          });
        }
      }
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

  const categories = [
    "Content Creation",
    "Development",
    "Sales & Marketing",
    "Customer Support",
    "Analytics",
    "Productivity"
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Tool Recommendations</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Get personalized AI tool suggestions based on your specific needs and use cases.
        </p>
      </motion.div>

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
              className="h-32 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Category (Optional)
            </label>
            <Select value={category || ''} onValueChange={(value) => setCategory(value || null)}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get AI Recommendations
              </>
            )}
          </Button>
        </div>
      </Card>

      <AnimatePresence>
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Recommended Tools for You
              </h2>
              <Button variant="outline" onClick={() => setRecommendations([])}>
                Clear Results
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {recommendations.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIRecommendations;
