
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Building2, Globe, Calendar, Network, Heart, Clock, TrendingUp, Check, X, Lightbulb, Link } from "lucide-react";

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
            {/* Header */}
            <div className="flex items-start gap-4">
              <img 
                src={tool.logo} 
                alt={tool.name} 
                className="w-16 h-16 rounded-lg object-contain bg-white border p-2" 
              />
              <div className="flex-1">
                <h3 className="font-semibold text-xl">{tool.name}</h3>
                <div className="flex items-center gap-1 text-sm text-amber-500">
                  ★ {tool.rating}/5 ({tool.reviews.toLocaleString()} reviews)
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="h-4 w-4" />
                <span>{tool.company_name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Founded: {tool.founding_year}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Network className="h-4 w-4" />
                <span>{tool.integration_count} Integrations</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4" />
                <a href={tool.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Visit Website
                </a>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Ease of Use</span>
                </div>
                <span className="text-lg font-semibold">{metrics?.ease_of_use_score?.toFixed(1)}/10</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Time Saved</span>
                </div>
                <span className="text-lg font-semibold">{metrics?.time_saved_per_task} min/task</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">ROI Score</span>
                </div>
                <span className="text-lg font-semibold">{metrics?.roi_score?.toFixed(1)}/10</span>
              </div>
            </div>

            {/* Strengths & Limitations */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Key Strengths</h4>
                <div className="space-y-2">
                  {sentiment?.pros?.slice(0, 3).map((pro, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Limitations</h4>
                <div className="space-y-2">
                  {sentiment?.cons?.slice(0, 3).map((con, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Key Insights</h4>
                <div className="space-y-2">
                  {sentiment?.key_insights?.slice(0, 2).map((insight, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{insight}</span>
                    </div>
                  ))}
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
