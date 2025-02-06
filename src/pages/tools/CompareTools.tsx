
import CompareToolsComponent from "@/components/CompareTools";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";
import { ArrowLeft, Download, Save } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ToolSelectionCard from "@/components/compare/ToolSelectionCard";
import SelectedToolsGrid from "@/components/compare/SelectedToolsGrid";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import CompareStats from "@/components/compare/CompareStats";
import { SmartFeatureMatch } from "@/components/compare/SmartFeatureMatch";

const CompareTools = () => {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const { toast } = useToast();

  const { data: tools = [], isLoading } = useQuery({
    queryKey: ['tools', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('tools')
        .select(`
          *,
          trending_tools (
            trend_score,
            trend_data
          )
        `)
        .order('featured', { ascending: false });
      
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return (data || []).map(tool => ({
        ...tool,
        trending_tools: tool.trending_tools || []
      })) as Tool[];
    }
  });

  const handleSelectTool = (tool: Tool) => {
    if (selectedTools.length < 4 && !selectedTools.includes(tool)) {
      setSelectedTools([...selectedTools, tool]);
      setIsSelecting(false);
    } else if (selectedTools.length >= 4) {
      toast({
        title: "Maximum tools reached",
        description: "You can compare up to 4 tools at a time.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveTool = (tool: Tool) => {
    setSelectedTools(selectedTools.filter((t) => t.id !== tool.id));
  };

  const handleReset = () => {
    setSelectedTools([]);
    setIsSelecting(false);
    setSelectedCategory(null);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Compare AI Tools</h1>
        <p className="text-gray-600">Get detailed insights and comparisons between different AI tools</p>
      </div>
      
      {!isSelecting && selectedTools.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleReset}
              className="flex items-center gap-2 text-gray-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Compare Different Tools
            </Button>
            <Button
              variant="default"
              onClick={handleSaveComparison}
              className="flex items-center gap-2 bg-[#2563EB] text-white hover:bg-[#2563EB]"
            >
              <Save className="h-4 w-4" />
              Save Comparison
            </Button>
          </div>

          <SelectedToolsGrid
            selectedTools={selectedTools}
            handleRemoveTool={handleRemoveTool}
            setIsSelecting={setIsSelecting}
          />

          <CompareStats tools={selectedTools} />
        </div>
      ) : (
        <ToolSelectionCard
          tools={tools}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSelectTool={handleSelectTool}
          selectedTools={selectedTools}
          setIsSelecting={setIsSelecting}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default CompareTools;
