
import { Tool } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ToolSelectionCardProps {
  tools: Tool[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSelectTool: (tool: Tool) => void;
  selectedTools: Tool[];
  setIsSelecting: (isSelecting: boolean) => void;
}

const ToolSelectionCard = ({
  tools,
  searchQuery,
  setSearchQuery,
  handleSelectTool,
  selectedTools,
  setIsSelecting,
}: ToolSelectionCardProps) => {
  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Scale className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Select a Tool to Compare</h2>
        </div>
        <Button variant="ghost" onClick={() => setIsSelecting(false)}>Cancel</Button>
      </div>
      
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search tools by name, category, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools
            .filter(tool => !selectedTools.some(selected => selected.id === tool.id))
            .map((tool) => (
              <Button
                key={tool.id}
                variant="outline"
                className="justify-start gap-2 bg-white hover:bg-gray-50 p-4 h-auto"
                onClick={() => handleSelectTool(tool)}
              >
                <img src={tool.logo} alt={tool.name} className="w-8 h-8 rounded" />
                <div className="text-left">
                  <div className="font-medium">{tool.name}</div>
                  <div className="text-sm text-gray-500">{tool.category}</div>
                </div>
              </Button>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ToolSelectionCard;
