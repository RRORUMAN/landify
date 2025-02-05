
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, DollarSign, Link } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import CompanyInfo from "./stats/CompanyInfo";
import PerformanceMetrics from "./stats/PerformanceMetrics";
import SentimentAnalysis from "./stats/SentimentAnalysis";

interface CompareStatsProps {
  tools: Tool[];
}

interface PerformanceMetric {
  tool_id: string;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  confidence_score: number;
  ease_of_use_score: number;
  time_saved_per_task: number;
  adoption_rate: number;
  feature_depth_score: number;
  integration_score: number;
  roi_score: number;
  automation_score: number;
  support_score: number;
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tools.map((tool) => {
        const metrics = performanceMetrics.find(m => m.tool_id === tool.id);
        const sentiment = getSentimentData(tool.id);
        
        return (
          <Card key={tool.id} className="p-6">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-4">
                <img 
                  src={tool.logo} 
                  alt={tool.name} 
                  className="w-16 h-16 rounded-lg object-contain bg-white border p-2" 
                />
                <div>
                  <h3 className="font-semibold text-lg">{tool.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    {tool.rating}/5 ({tool.reviews} reviews)
                  </div>
                </div>
              </div>

              <CompanyInfo tool={tool} />

              {tool.pricing_range && (
                <div className="flex items-center gap-2 mt-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">{tool.pricing_range}</span>
                </div>
              )}
            </div>
            
            <PerformanceMetrics metrics={metrics} />
            <SentimentAnalysis sentiment={sentiment} />
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Best For</h4>
              <div className="flex flex-wrap gap-2">
                {tool.best_for?.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
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
