import CompareToolsComponent from "@/components/CompareTools";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";
import { ArrowLeft, Download, Save, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ToolSelectionCard from "@/components/compare/ToolSelectionCard";
import SelectedToolsGrid from "@/components/compare/SelectedToolsGrid";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import CompareStats from "@/components/compare/CompareStats";
import QuickCompare from "@/components/compare/QuickCompare";
import type { ToolCompatibility } from "@/types/aiTypes";
import { getToolCompatibility } from "@/utils/aiAnalytics";
import type { AIInsight } from "@/types/aiTypes";
import { getToolInsights } from "@/utils/aiAnalytics";
import { getROIAnalytics } from "@/utils/aiAnalytics";
import { AICompatibilityScore } from "@/components/compare/AICompatibilityScore";
import { SmartFeatureMatch } from "@/components/compare/SmartFeatureMatch";
import CompareROI from "@/components/compare/CompareROI";

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

  const { data: compatibility = null, isLoading: isLoadingCompatibility } = useQuery({
    queryKey: ['tool-compatibility', selectedTools.map(t => t.id)],
    queryFn: async () => {
      if (selectedTools.length !== 2) return null;
      return getToolCompatibility(selectedTools[0].id, selectedTools[1].id);
    },
    enabled: selectedTools.length === 2
  });

  const { data: insights = [], isLoading: isLoadingInsights } = useQuery({
    queryKey: ['tool-insights', selectedTools.map(t => t.id)],
    queryFn: async () => {
      const allInsights = await Promise.all(
        selectedTools.map(tool => getToolInsights(tool.id))
      );
      return allInsights.flat();
    },
    enabled: selectedTools.length > 0
  });

  const { data: roiMetrics = [], isLoading: isLoadingROI } = useQuery({
    queryKey: ['tool-roi', selectedTools.map(t => t.id)],
    queryFn: async () => {
      const metrics = await Promise.all(
        selectedTools.map(tool => getROIAnalytics(tool.id))
      );
      return metrics.filter(Boolean);
    },
    enabled: selectedTools.length > 0
  });

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
                variant="secondary"
                onClick={handleSaveComparison}
                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
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

          {compatibility && (
            <AICompatibilityScore
              score={compatibility.compatibility_score}
              factors={compatibility.integration_factors}
              useCases={compatibility.use_case_match}
            />
          )}

          <QuickCompare tools={selectedTools} />
          
          {insights.length > 0 && (
            <SmartFeatureMatch
              tools={selectedTools}
              features={insights.map(insight => ({
                name: insight.insight_type,
                importance: 'high',
                values: selectedTools.map(tool => ({
                  toolId: tool.id,
                  value: insight.insight_data[tool.id] || false,
                  notes: insight.recommendations?.find(r => r.toolId === tool.id)?.text
                }))
              }))}
            />
          )}

          <CompareStats tools={selectedTools} />
          <CompareROI tools={selectedTools} />
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
