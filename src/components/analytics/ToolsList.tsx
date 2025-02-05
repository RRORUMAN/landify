
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import type { UserTool } from "@/data/types";

interface ToolsListProps {
  userTools: UserTool[];
  getToolMetrics: (toolId: string) => any[];
}

export const ToolsList = ({ userTools, getToolMetrics }: ToolsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {userTools.map((tool) => (
        <Card key={tool.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <img 
                src={tool.tool?.logo} 
                alt={tool.tool?.name} 
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{tool.tool?.name}</h3>
                <p className="text-sm text-gray-500">{tool.tool?.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${tool.monthly_cost}/mo</p>
              <p className="text-sm text-gray-500">
                Next billing: {tool.next_billing_date ? 
                  format(new Date(tool.next_billing_date), 'MMM dd, yyyy') : 
                  'N/A'}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {getToolMetrics(tool.tool_id).map((metric) => (
              <div key={metric.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{metric.metric_name}</span>
                <span className="font-medium">{metric.metric_value} {metric.metric_unit}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
