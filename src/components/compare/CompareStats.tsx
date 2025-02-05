
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ThumbsUp, DollarSign, Users, Zap, Award, TrendingUp } from "lucide-react";
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

  const getMetricValue = (toolId: string, metricName: string) => {
    const metric = performanceMetrics.find(
      m => m.tool_id === toolId && m.metric_name === metricName
    );
    return metric?.metric_value || 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tools.map((tool) => (
        <Card key={tool.id} className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <img src={tool.logo} alt={tool.name} className="w-16 h-16 rounded-lg" />
            <div>
              <h3 className="font-semibold text-lg">{tool.name}</h3>
              <p className="text-sm text-gray-500">{tool.pricing}</p>
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
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Response Time</span>
              </div>
              <span className="text-sm">
                {getMetricValue(tool.id, 'response_time')}ms
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <span className="text-sm">
                {getMetricValue(tool.id, 'success_rate')}%
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">Active Users</span>
              </div>
              <span className="text-sm">{tool.bookmarks}+</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium">Processing Speed</span>
              </div>
              <span className="text-sm">
                {getMetricValue(tool.id, 'processing_speed')} ops/s
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-medium">Accuracy Score</span>
              </div>
              <span className="text-sm">
                {getMetricValue(tool.id, 'accuracy_score')}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium">Growth Rate</span>
              </div>
              <span className="text-sm">
                {getMetricValue(tool.id, 'growth_rate')}% MoM
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-cyan-500" />
                <span className="text-sm font-medium">Value Score</span>
              </div>
              <span className="text-sm">
                {getMetricValue(tool.id, 'value_score')}/10
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">Key Differentiators</h4>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CompareStats;
