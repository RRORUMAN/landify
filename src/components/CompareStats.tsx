
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, Clock, Shield, HeartHandshake, Brain, Zap, Timer, BarChart3, Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CompareStatsProps {
  tools: Tool[];
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
      return data;
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

  const getMetricsForTool = (toolId: string) => 
    performanceMetrics.find(m => m.tool_id === toolId);

  const getSentimentForTool = (toolId: string) => 
    sentimentData.find(s => s.tool_id === toolId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map((tool) => {
        const metrics = getMetricsForTool(tool.id);
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

            {/* Key Metrics */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-gray-900">Performance Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  icon={HeartHandshake}
                  title="User Satisfaction"
                  value={metrics?.customer_satisfaction_score}
                  max={5}
                  unit="/5"
                  color="text-purple-500"
                />
                <MetricCard
                  icon={Brain}
                  title="Learning Curve"
                  value={metrics?.learning_curve_score}
                  max={5}
                  unit="/5"
                  color="text-blue-500"
                />
                <MetricCard
                  icon={Shield}
                  title="API Reliability"
                  value={metrics?.api_reliability_score}
                  max={5}
                  unit="/5"
                  color="text-green-500"
                />
                <MetricCard
                  icon={Clock}
                  title="Support Response"
                  value={metrics?.support_response_time}
                  unit="hrs"
                  color="text-orange-500"
                  inverse
                />
              </div>
            </div>

            {/* Performance Bars */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium text-sm text-gray-900">Performance Indicators</h4>
              <MetricBar
                icon={Zap}
                title="Ease of Use"
                value={metrics?.ease_of_use_score}
                max={10}
                color="bg-blue-500"
              />
              <MetricBar
                icon={Timer}
                title="Time Saved per Task"
                value={metrics?.time_saved_per_task}
                max={30}
                unit="min"
                color="bg-green-500"
              />
              <MetricBar
                icon={BarChart3}
                title="ROI Score"
                value={metrics?.roi_score}
                max={10}
                color="bg-purple-500"
              />
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-2 gap-6 border-t pt-4">
              {/* Strengths */}
              <div>
                <h4 className="font-medium text-sm text-gray-900 mb-3">Key Strengths</h4>
                <div className="space-y-2">
                  {pros.slice(0, 3).map((pro, index) => (
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
                  {cons.slice(0, 3).map((con, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-sm text-gray-900 mb-3">Expert Insights</h4>
              <div className="space-y-2">
                {insights.slice(0, 2).map((insight, index) => (
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
          </Card>
        );
      })}
    </div>
  );
};

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value?: number | null;
  max?: number;
  unit?: string;
  color: string;
  inverse?: boolean;
}

const MetricCard = ({ icon: Icon, title, value, max, unit, color, inverse }: MetricCardProps) => {
  if (!value) return null;

  const displayValue = inverse ? 
    `${value}${unit}` :
    `${value}${unit ?? ` / ${max}`}`;

  const score = inverse ? 
    ((max ?? value) - value) / (max ?? value) * 100 :
    (value / (max ?? value)) * 100;

  return (
    <div className="p-3 rounded-lg border bg-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold">{displayValue}</span>
      </div>
    </div>
  );
};

interface MetricBarProps {
  icon: React.ElementType;
  title: string;
  value?: number | null;
  max: number;
  unit?: string;
  color: string;
}

const MetricBar = ({ icon: Icon, title, value, max, unit, color }: MetricBarProps) => {
  if (!value) return null;

  const percentage = (value / max) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        <span className="text-sm font-semibold">
          {value}{unit}
        </span>
      </div>
      <Progress value={percentage} className={`h-2 ${color}`} />
    </div>
  );
};

export default CompareStats;
