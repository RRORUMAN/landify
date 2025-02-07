
import { Tool } from "@/data/types";
import ToolHeader from "../features/ToolHeader";

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

