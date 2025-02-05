
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";
import { ArrowLeft, Download, Save, Filter } from "lucide-react";
import CompareStats from "./compare/CompareStats";
import { useQuery } from "@tanstack/react-query";
import ToolSelectionCard from "./compare/ToolSelectionCard";
import SelectedToolsGrid from "./compare/SelectedToolsGrid";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

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
      
      if (error) {
        toast({
          title: "Error loading tools",
          description: "Failed to load tools. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
      
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

  const handleExport = async (format: 'pdf' | 'csv') => {
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
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[200px] rounded-lg" />
          ))}
        </div>
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
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
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
    </div>
  );
};

export default CompareTools;
