
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";
import { Scale, ArrowLeft } from "lucide-react";
import CompareFeatureGrid from "./compare/CompareFeatureGrid";
import CompareStats from "./compare/CompareStats";
import ComparePricing from "./compare/ComparePricing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import ToolSelectionCard from "./compare/ToolSelectionCard";
import SelectedToolsGrid from "./compare/SelectedToolsGrid";

const CompareTools = () => {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);

  // Use react-query to fetch all tools
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

  const handleSelectTool = (tool: Tool) => {
    if (selectedTools.length < 4 && !selectedTools.includes(tool)) {
      setSelectedTools([...selectedTools, tool]);
      setIsSelecting(false);
    }
  };

  const handleRemoveTool = (tool: Tool) => {
    setSelectedTools(selectedTools.filter((t) => t.id !== tool.id));
  };

  const handleReset = () => {
    setSelectedTools([]);
    setIsSelecting(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading tools...</p>
      </div>
    );
  }

  if (isSelecting) {
    return (
      <ToolSelectionCard
        tools={tools}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSelectTool={handleSelectTool}
        selectedTools={selectedTools}
        setIsSelecting={setIsSelecting}
      />
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

          <SelectedToolsGrid
            selectedTools={selectedTools}
            handleRemoveTool={handleRemoveTool}
            setIsSelecting={setIsSelecting}
          />

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
        <ToolSelectionCard
          tools={tools}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSelectTool={handleSelectTool}
          selectedTools={selectedTools}
          setIsSelecting={setIsSelecting}
        />
      )}
    </div>
  );
};

export default CompareTools;
