
import { Tool } from "@/data/types";
import { Star, Zap, Award } from "lucide-react";

interface ToolHeaderProps {
  tool: Tool;
  metric?: {
    metric_value: number;
    roi_score: number;
  };
}

const ToolHeader = ({ tool, metric }: ToolHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
      <div className="flex items-center gap-3">
        <img 
          src={tool.logo} 
          alt={tool.name} 
          className="w-10 h-10 rounded-lg object-cover"
        />
        <div>
          <div className="font-semibold text-sm">{tool.name}</div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            {tool.rating}/5
          </div>
        </div>
      </div>
      {metric && (
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-gray-600">
            <Zap className="h-3 w-3 text-blue-500" />
            Score: {metric.metric_value}
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Award className="h-3 w-3 text-green-500" />
            ROI: {metric.roi_score}
          </div>
        </div>
      )}
    </div>
  );
};

interface ComparisonHeaderProps {
  tools: Tool[];
  getMetricForTool: (toolId: string) => any;
}

const ComparisonHeader = ({ tools, getMetricForTool }: ComparisonHeaderProps) => {
  return (
    <div className="sticky top-0 bg-white z-10 pb-4 border-b">
      <div className="grid grid-cols-[1fr,repeat(4,1fr)] gap-4">
        <div className="font-semibold text-gray-500">Feature</div>
        {tools.map((tool) => (
          <ToolHeader
            key={tool.id}
            tool={tool}
            metric={getMetricForTool(tool.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ComparisonHeader;
