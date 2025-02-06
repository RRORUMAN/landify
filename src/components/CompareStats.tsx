
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompareStatsProps {
  tools: Tool[];
}

const CompareStats = ({ tools }: CompareStatsProps) => {
  const { data: sentimentData = [] } = useQuery({
    queryKey: ['tool_reviews_sentiment', tools.map(t => t.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tool_reviews_sentiment')
        .select('*')
        .in('tool_id', tools.map(t => t.id));
      
      if (error) throw error;
      return data;
    }
  });

  const getSentimentForTool = (toolId: string) => 
    sentimentData.find(s => s.tool_id === toolId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map((tool) => {
        const sentiment = getSentimentForTool(tool.id);
        const pros = sentiment?.pros as string[] || [];
        const cons = sentiment?.cons as string[] || [];
        const insights = sentiment?.key_insights as string[] || [];
        
        return (
          <Card key={tool.id} className="p-6 space-y-6">
            {/* Tool Header */}
            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold text-gray-900">{tool.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">{tool.rating}/5</span>
                </div>
                <span className="text-sm text-gray-500">({tool.reviews} reviews)</span>
              </div>
              <p className="mt-3 text-sm text-gray-600">{tool.description}</p>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-2 text-gray-900">{tool.category}</span>
                </div>
                <div>
                  <span className="text-gray-500">Pricing:</span>
                  <span className="ml-2 text-gray-900">{tool.pricing}</span>
                </div>
              </div>
            </div>

            <Button
              variant="default"
              className="w-full bg-[#2563EB] hover:bg-[#2563EB] text-white"
              onClick={() => window.open(tool.visit_url, '_blank')}
            >
              <Link className="h-4 w-4 mr-2" />
              Visit Tool
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default CompareStats;
