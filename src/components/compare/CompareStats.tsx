
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Link, Check, X } from "lucide-react";
import ToolHeader from "./stats/ToolHeader";
import KeyMetrics from "./stats/KeyMetrics";
import PerformanceIndicators from "./stats/PerformanceIndicators";

interface CompareStatsProps {
  tools: Tool[];
}

interface PerformanceMetric {
  tool_id: string;
  metric_value: number;
  roi_score: number;
  ease_of_use_score: number;
  time_saved_per_task: number;
}

interface SentimentData {
  tool_id: string;
  sentiment_score: number;
  pros: string[];
  cons: string[];
  key_insights: string[];
}

const CompareStats = ({ tools }: CompareStatsProps) => {
  const { data: performanceMetrics = [], isError: isMetricsError } = useQuery({
    queryKey: ['performance_metrics', tools.map(t => t.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .in('tool_id', tools.map(t => t.id));
      
      if (error) {
        toast({
          title: "Error loading metrics",
          description: "Could not load performance metrics",
          variant: "destructive",
        });
        throw error;
      }
      return data as PerformanceMetric[];
    }
  });

  const { data: sentimentData = [], isError: isSentimentError } = useQuery({
    queryKey: ['tool_reviews_sentiment', tools.map(t => t.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tool_reviews_sentiment')
        .select('*')
        .in('tool_id', tools.map(t => t.id));
      
      if (error) {
        toast({
          title: "Error loading sentiment data",
          description: "Could not load sentiment analysis",
          variant: "destructive",
        });
        throw error;
      }
      return data as SentimentData[];
    }
  });

  const getSentimentData = (toolId: string) => {
    return sentimentData.find(s => s.tool_id === toolId);
  };

  if (isMetricsError || isSentimentError) {
    return (
      <div className="text-center py-8 text-gray-500">
        Error loading comparison data. Please try again.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map((tool) => {
        const metrics = performanceMetrics.find(m => m.tool_id === tool.id);
        const sentiment = getSentimentData(tool.id);
        
        return (
          <Card key={tool.id} className="p-6 flex flex-col gap-6">
            <ToolHeader tool={tool} />
            <KeyMetrics metrics={metrics} />
            <PerformanceIndicators metrics={metrics} />

            {/* Insights Grid */}
            <div className="grid grid-cols-2 gap-6 border-t pt-4">
              {/* Strengths */}
              <div>
                <h4 className="font-medium text-sm text-gray-900 mb-3">Key Strengths</h4>
                <div className="space-y-2">
                  {sentiment?.pros.slice(0, 3).map((pro, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Limitations */}
              <div>
                <h4 className="font-medium text-sm text-gray-900 mb-3">Limitations</h4>
                <div className="space-y-2">
                  {sentiment?.cons.slice(0, 3).map((con, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expert Insights */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-sm text-gray-900 mb-3">Expert Insights</h4>
              <div className="space-y-2">
                {sentiment?.key_insights.slice(0, 2).map((insight, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                    <p className="text-sm text-gray-600">{insight}</p>
                  </div>
                ))}
              </div>
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
              variant="outline"
              className="mt-auto w-full"
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
