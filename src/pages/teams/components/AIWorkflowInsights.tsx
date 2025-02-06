
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, TrendingUp, DollarSign, Zap } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AIWorkflowInsight } from '@/data/types';
import { supabase } from "@/integrations/supabase/client";

interface AIWorkflowInsightsProps {
  teamId: string;
}

const AIWorkflowInsights = ({ teamId }: AIWorkflowInsightsProps) => {
  const { data: insights, isLoading } = useQuery({
    queryKey: ['team-insights', teamId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('generate_team_workflow_insights', {
        team_id_param: teamId
      });

      if (error) throw error;
      return data as AIWorkflowInsight[];
    }
  });

  const getInsightIcon = (type: AIWorkflowInsight['insight_type']) => {
    switch (type) {
      case 'task_suggestion':
        return <Zap className="h-5 w-5 text-yellow-500" />;
      case 'bottleneck':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'optimization':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'cost_saving':
        return <DollarSign className="h-5 w-5 text-green-500" />;
    }
  };

  if (isLoading) {
    return <Card className="p-6 animate-pulse" />;
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-black dark:text-white mb-4">AI Workflow Insights</h3>
      <div className="space-y-4">
        {insights?.map((insight) => (
          <Card key={insight.id} className="p-4">
            <div className="flex items-start space-x-4">
              {getInsightIcon(insight.insight_type)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-black dark:text-white">
                    {insight.insight_data.tool_name}
                  </h4>
                  <Badge variant={
                    insight.priority_level === 'high' ? 'destructive' :
                    insight.priority_level === 'medium' ? 'default' : 'secondary'
                  }>
                    {insight.priority_level}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {insight.insight_data.suggestion}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>Users: {insight.insight_data.user_count}</span>
                  <span>Cost: ${insight.insight_data.total_cost}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default AIWorkflowInsights;
