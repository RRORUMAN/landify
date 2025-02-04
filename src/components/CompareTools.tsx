import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tools } from "@/data/tools";
import { Tool } from "@/data/tools";
import { Scale } from "lucide-react";

const CompareTools = () => {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);

  const handleSelectTool = (tool: Tool) => {
    if (selectedTools.length < 2 && !selectedTools.includes(tool)) {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleRemoveTool = (tool: Tool) => {
    setSelectedTools(selectedTools.filter((t) => t.id !== tool.id));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Scale className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Compare Tools</h2>
      </div>
      
      {selectedTools.length < 2 && (
        <p className="text-gray-600 mb-4">
          Select up to 2 tools to compare their features
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedTools.map((tool) => (
          <Card key={tool.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <img src={tool.logo} alt={tool.name} className="w-10 h-10 rounded-lg" />
                <div>
                  <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                  <p className="text-sm text-gray-500">{tool.pricing}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveTool(tool)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </Button>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">{tool.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedTools.length < 2 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools
            .filter((tool) => !selectedTools.includes(tool))
            .slice(0, 6)
            .map((tool) => (
              <Button
                key={tool.id}
                variant="outline"
                className="justify-start gap-2"
                onClick={() => handleSelectTool(tool)}
              >
                <img src={tool.logo} alt={tool.name} className="w-6 h-6 rounded" />
                {tool.name}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
};

export default CompareTools;