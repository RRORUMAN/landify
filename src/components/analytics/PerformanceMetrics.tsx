
import { Card } from "@/components/ui/card";
import type { UserTool } from "@/data/types";

interface PerformanceMetricsProps {
  userTools: UserTool[];
  metrics: any[];
}

export const PerformanceMetrics = ({ userTools, metrics }: PerformanceMetricsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Tool Performance Metrics</h2>
      <div className="space-y-8">
        {userTools.map((tool) => {
          const toolMetrics = metrics.filter(m => m.tool_id === tool.tool_id);
          return (
            <div key={tool.id} className="border-b pb-6 last:border-0">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={tool.tool?.logo} 
                  alt={tool.tool?.name} 
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{tool.tool?.name}</h3>
                  <p className="text-sm text-gray-500">
                    {tool.tool?.integrations_count} integrations · {tool.tool?.monthly_active_users} active users
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {toolMetrics.map((metric) => (
                  <Card key={metric.id} className="p-4">
                    <p className="text-sm text-gray-600">{metric.metric_name}</p>
                    <p className="text-xl font-semibold">
                      {metric.metric_value} {metric.metric_unit}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
