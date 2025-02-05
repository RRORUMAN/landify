
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface SelectedToolsGridProps {
  selectedTools: Tool[];
  handleRemoveTool: (tool: Tool) => void;
  setIsSelecting: (isSelecting: boolean) => void;
}

const SelectedToolsGrid = ({
  selectedTools,
  handleRemoveTool,
  setIsSelecting,
}: SelectedToolsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {selectedTools.map((tool) => (
        <Card key={tool.id} className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <img src={tool.logo} alt={tool.name} className="w-10 h-10 rounded-lg" />
              <div>
                <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                <p className="text-sm text-gray-500">{tool.category}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveTool(tool)}
              className="text-red-500 hover:text-red-600 p-0 h-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
      {Array.from({ length: 4 - selectedTools.length }).map((_, index) => (
        <Card 
          key={`empty-${index}`} 
          className="p-4 border-dashed cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsSelecting(true)}
        >
          <div className="flex items-center justify-center gap-2 h-[72px] text-gray-400">
            <Plus className="h-5 w-5" />
            <p className="text-sm">Add tool to compare</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SelectedToolsGrid;
