
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const TrendingTools = () => {
  const [trendingTools, setTrendingTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTrendingTools = async () => {
      try {
        const { data: tools, error } = await supabase
          .from('tools')
          .select(`
            *,
            trending_tools (
              trend_score,
              trend_data
            )
          `)
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;

        // Convert the response to match the Tool type
        const formattedTools = tools.map(tool => ({
          ...tool,
          trending_tools: tool.trending_tools || []
        })) as Tool[];

        // Sort by trend_score if available
        formattedTools.sort((a, b) => {
          const scoreA = a.trending_tools?.[0]?.trend_score || 0;
          const scoreB = b.trending_tools?.[0]?.trend_score || 0;
          return scoreB - scoreA;
        });

        setTrendingTools(formattedTools);
      } catch (error) {
        console.error('Error fetching trending tools:', error);
        toast({
          title: "Error",
          description: "Failed to load trending tools. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingTools();
    // Refresh trending tools every hour
    const interval = setInterval(fetchTrendingTools, 3600000);
    return () => clearInterval(interval);
  }, [toast]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-[300px] rounded-xl" />
        ))}
      </div>
    );
  }

  if (trendingTools.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Trending Tools</h2>
        </div>
        <Button variant="outline" className="text-blue-600">
          <Star className="h-4 w-4 mr-2" />
          View All Trending
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {trendingTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrendingTools;

