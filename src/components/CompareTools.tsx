
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";
import { Scale, ArrowLeft, X } from "lucide-react";
import CompareFeatureGrid from "./compare/CompareFeatureGrid";
import CompareStats from "./compare/CompareStats";
import ComparePricing from "./compare/ComparePricing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const CompareTools = () => {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: tools = [], isLoading } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Tool[];
    }
  });

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectTool = (tool: Tool) => {
    if (selectedTools.length < 4 && !selectedTools.includes(tool)) {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleRemoveTool = (tool: Tool) => {
    setSelectedTools(selectedTools.filter((t) => t.id !== tool.id));
  };

  const handleReset = () => {
    setSelectedTools([]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading tools...</p>
      </div>
    );
  }

  return (
    <div>
      {selectedTools.length > 0 ? (
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
            <p className="text-sm text-gray-500">
              Comparing {selectedTools.length} of 4 tools
            </p>
          </div>

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
              <Card key={`empty-${index}`} className="p-4 border-dashed">
                <div className="flex items-center justify-center h-[72px] text-gray-400">
                  <p className="text-sm">Add tool to compare</p>
                </div>
              </Card>
            ))}
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
          
          <p className="text-gray-600 mb-6">
            Select up to 4 tools to compare their features, pricing, and performance metrics
          </p>

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
              {filteredTools.map((tool) => (
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
      )}
    </div>
  );
};

export default CompareTools;
