
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
  Building,
  Calendar,
  BarChart,
  Puzzle,
  Heart,
  Headphones
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

const CompareStats = ({ tools }: CompareStatsProps) => {
  const { data: performanceMetrics = [] } = useQuery({
    queryKey: ['performance_metrics', tools.map(t => t.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .in('tool_id', tools.map(t => t.id));
      
      if (error) throw error;
      return data as PerformanceMetric[];
    }
  });

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

  const getMetricValue = (toolId: string, metricName: string) => {
    const metric = performanceMetrics.find(
      m => m.tool_id === toolId && m.metric_name === metricName
    );
    return metric?.metric_value || 0;
  };

  const getSentimentData = (toolId: string) => {
    return sentimentData.find(s => s.tool_id === toolId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tools.map((tool) => {
        const sentiment = getSentimentData(tool.id);
        return (
          <Card key={tool.id} className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <img src={tool.logo} alt={tool.name} className="w-16 h-16 rounded-lg" />
              <div>
                <h3 className="font-semibold text-lg">{tool.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Building className="h-4 w-4" />
                  {tool.company_name ?? 'N/A'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Founded: {tool.founding_year ?? 'N/A'}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium">Rating</span>
                </div>
                <span className="text-sm">{tool.rating}/5 ({tool.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-medium">Performance</span>
                </div>
                <span className="text-sm">{getMetricValue(tool.id, 'performance_score')}/100</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">Time Saved</span>
                </div>
                <span className="text-sm">
                  {performanceMetrics.find(m => m.tool_id === tool.id)?.time_saved_per_task || 0}min/task
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <span className="text-sm font-medium">Active Users</span>
                </div>
                <span className="text-sm">{tool.monthly_active_users?.toLocaleString() ?? 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Puzzle className="h-5 w-5 text-indigo-500" />
                  <span className="text-sm font-medium">Integrations</span>
                </div>
                <span className="text-sm">{tool.integrations_count ?? 0}+</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium">Ease of Use</span>
                </div>
                <span className="text-sm">
                  {performanceMetrics.find(m => m.tool_id === tool.id)?.ease_of_use_score || 0}/10
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-teal-500" />
                  <span className="text-sm font-medium">Support Score</span>
                </div>
                <span className="text-sm">
                  {performanceMetrics.find(m => m.tool_id === tool.id)?.support_score || 0}/10
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">ROI Score</span>
                </div>
                <span className="text-sm">
                  {performanceMetrics.find(m => m.tool_id === tool.id)?.roi_score || 0}/10
                </span>
              </div>
            </div>
            
            {sentiment && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-3">Key Insights</h4>
                <div className="space-y-2">
                  {sentiment.key_insights?.slice(0, 3).map((insight, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <Award className="h-4 w-4 text-blue-500 mt-0.5" />
                      {insight}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Best For</h4>
              <div className="flex flex-wrap gap-2">
                {tool.best_for?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CompareStats;
