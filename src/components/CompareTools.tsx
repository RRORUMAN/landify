
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";
import { Scale, ArrowLeft, Download, Save, Calculator } from "lucide-react";
import CompareFeatureGrid from "./compare/CompareFeatureGrid";
import CompareStats from "./compare/CompareStats";
import ComparePricing from "./compare/ComparePricing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import ToolSelectionCard from "./compare/ToolSelectionCard";
import SelectedToolsGrid from "./compare/SelectedToolsGrid";
import QuickCompare from "./compare/QuickCompare";
import CompareROI from "./compare/CompareROI";
import { useToast } from "@/components/ui/use-toast";

const CompareTools = () => {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const { toast } = useToast();

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

  const handleExport = async (format: 'pdf' | 'csv') => {
    // This would be implemented with a proper export service
    toast({
      title: "Export Started",
      description: `Exporting comparison in ${format.toUpperCase()} format...`,
    });
  };

  const handleSaveComparison = async () => {
    if (!selectedTools.length) return;

    try {
      const { error } = await supabase.from('saved_comparisons').insert({
        name: `Comparison ${new Date().toLocaleDateString()}`,
        tool_ids: selectedTools.map(t => t.id),
        comparison_data: {
          toolIds: selectedTools.map(t => t.id),
          timestamp: new Date().toISOString(),
          toolNames: selectedTools.map(t => t.name)
        }
      });

      if (error) throw error;

      toast({
        title: "Comparison Saved",
        description: "You can access this comparison later from your dashboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save comparison. Please try again.",
        variant: "destructive",
      });
    }
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
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleExport('csv')}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
              <Button
                onClick={handleSaveComparison}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Comparison
              </Button>
            </div>
          </div>

          <SelectedToolsGrid
            selectedTools={selectedTools}
            handleRemoveTool={handleRemoveTool}
            setIsSelecting={setIsSelecting}
          />

          <QuickCompare tools={selectedTools} />

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
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
            <TabsContent value="roi" className="mt-6">
              <CompareROI tools={selectedTools} />
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
