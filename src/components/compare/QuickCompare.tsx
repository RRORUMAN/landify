
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, TrendingUp, Zap, Award } from "lucide-react";

interface QuickCompareProps {
  tools: Tool[];
}

const QuickCompare = ({ tools }: QuickCompareProps) => {
  const { data: metrics = [] } = useQuery({
    queryKey: ['performance_metrics', tools.map(t => t.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tool_performance')
        .select('*')
        .in('tool_id', tools.map(t => t.id));
      
      if (error) throw error;
      return data;
    }
  });

  const getMetricForTool = (toolId: string) => {
    return metrics.find(m => m.tool_id === toolId);
  };

  return (
    <TooltipProvider>
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Compare</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => {
            const metric = getMetricForTool(tool.id);
            return (
              <div key={tool.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <img src={tool.logo} alt={tool.name} className="w-8 h-8 rounded" />
                  <span className="font-medium">{tool.name}</span>
                </div>
                
                <div className="space-y-2">
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm">Rating</span>
                        </div>
                        <span className="font-medium">{tool.rating}/5</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Based on {tool.reviews} user reviews</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">Performance</span>
                        </div>
                        <span className="font-medium">
                          {metric ? `${Math.round(metric.accuracy_score * 100)}%` : 'N/A'}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Overall performance score based on multiple factors</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          <span className="text-sm">ROI Score</span>
                        </div>
                        <span className="font-medium">
                          {metric ? `${Math.round(metric.cost_efficiency_score * 10)}/10` : 'N/A'}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Return on Investment score based on user feedback</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-purple-400" />
                          <span className="text-sm">User Score</span>
                        </div>
                        <span className="font-medium">
                          {metric ? `${Math.round(metric.ease_of_use_score * 10)}/10` : 'N/A'}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ease of use and user satisfaction score</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default QuickCompare;
