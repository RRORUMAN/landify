
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, Clock, Shield, HeartHandshake, Brain, Zap, Timer, BarChart3 } from "lucide-react";
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
        
        return (
          <Card key={tool.id} className="p-6 space-y-6">
            {/* Tool Header */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
              <div className="flex items-center gap-1 mt-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm">{tool.rating}/5 ({tool.reviews} reviews)</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{tool.description}</p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                icon={HeartHandshake}
                title="Customer Satisfaction"
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

            {/* Additional Metrics */}
            <div className="space-y-4">
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

            {/* Key Insights */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-900">Key Insights</h4>
              {sentiment?.key_insights?.map((insight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <p className="text-sm text-gray-600 flex-1">{insight}</p>
                </div>
              ))}
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-900 mb-2">Strengths</h4>
                <ul className="space-y-2">
                  {sentiment?.pros?.slice(0, 3).map((pro: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 text-lg leading-none">+</span>
                      <span className="flex-1">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-900 mb-2">Limitations</h4>
                <ul className="space-y-2">
                  {sentiment?.cons?.slice(0, 3).map((con: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-red-500 text-lg leading-none">-</span>
                      <span className="flex-1">{con}</span>
                    </li>
                  ))}
                </ul>
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
