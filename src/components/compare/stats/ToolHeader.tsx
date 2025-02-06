
import { Tool } from "@/data/types";
import { Star } from "lucide-react";

interface ToolHeaderProps {
  tool: Tool;
}

const ToolHeader = ({ tool }: ToolHeaderProps) => {
  return (
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
  );
};

export default ToolHeader;
