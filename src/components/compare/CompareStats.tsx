
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Clock, 
  ThumbsUp, 
  DollarSign, 
  Users, 
  Zap, 
  Award, 
  TrendingUp,
  Building2,
  Calendar,
  BarChart,
  Puzzle,
  Heart,
  Headphones,
  Check,
  X,
  Globe,
  Link
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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

  const getMetricValue = (toolId: string, metricName: string) => {
    const metric = performanceMetrics.find(
      m => m.tool_id === toolId && m.metric_name === metricName
    );
    return metric?.metric_value || 0;
  };

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

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="h-4 w-4" />
                  <span>{tool.company_name ?? 'N/A'}</span>
                </div>
                
                {tool.company_website && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="h-4 w-4" />
                    <a 
                      href={tool.company_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Founded: {tool.founding_year ?? 'N/A'}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Puzzle className="h-4 w-4" />
                  <span>{tool.integration_count ?? 0} Integrations</span>
                </div>
              </div>

              {tool.pricing_range && (
                <div className="flex items-center gap-2 mt-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">{tool.pricing_range}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <TooltipProvider>
                <div className="flex items-center justify-between">
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-medium">Ease of Use</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>How easy the tool is to use and learn</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-sm">{metrics?.ease_of_use_score?.toFixed(1) ?? 'N/A'}/10</span>
                </div>

                <div className="flex items-center justify-between">
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium">Time Saved</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Average time saved per task using this tool</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-sm">
                    {metrics?.time_saved_per_task ?? 'N/A'} min/task
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-purple-500" />
                      <span className="text-sm font-medium">ROI Score</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Return on Investment score based on user feedback</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-sm">
                    {metrics?.roi_score?.toFixed(1) ?? 'N/A'}/10
                  </span>
                </div>
              </TooltipProvider>

              {sentiment && (
                <>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3 text-sm">Key Strengths</h4>
                    <div className="space-y-2">
                      {sentiment.pros?.slice(0, 3).map((pro, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="font-medium mb-3 text-sm">Limitations</h4>
                    <div className="space-y-2">
                      {sentiment.cons?.slice(0, 3).map((con, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="font-medium mb-3 text-sm">Key Insights</h4>
                    <div className="space-y-2">
                      {sentiment.key_insights?.slice(0, 2).map((insight, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <Award className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            
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
