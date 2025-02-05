
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tools } from "@/data/tools";
import type { Tool } from "@/data/types";
import { Scale, ArrowLeft } from "lucide-react";
import CompareFeatureGrid from "./compare/CompareFeatureGrid";
import CompareStats from "./compare/CompareStats";
import ComparePricing from "./compare/ComparePricing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const handleReset = () => {
    setSelectedTools([]);
  };

  return (
    <div>
      {selectedTools.length === 2 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Compare Different Tools
            </Button>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <CompareStats tools={selectedTools} />
            </TabsContent>
            <TabsContent value="features" className="mt-6">
              <CompareFeatureGrid tools={selectedTools} />
            </TabsContent>
            <TabsContent value="pricing" className="mt-6">
              <ComparePricing tools={selectedTools} />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Scale className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Compare Tools</h2>
          </div>
          
          <p className="text-gray-600 mb-4">
            Select up to 2 tools to compare their features
          </p>

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
              </Card>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {tools
              .filter((tool) => !selectedTools.includes(tool))
              .slice(0, 6)
              .map((tool) => (
                <Button
                  key={tool.id}
                  variant="outline"
                  className="justify-start gap-2 bg-white hover:bg-gray-50"
                  onClick={() => handleSelectTool(tool)}
                >
                  <img src={tool.logo} alt={tool.name} className="w-6 h-6 rounded" />
                  <span className="truncate">{tool.name}</span>
                </Button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareTools;
