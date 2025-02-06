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
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import CompareStats from "@/components/compare/CompareStats";
import type { ToolCompatibility } from "@/types/aiTypes";
import { getToolCompatibility } from "@/utils/aiAnalytics";
import type { AIInsight } from "@/types/aiTypes";
import { getToolInsights } from "@/utils/aiAnalytics";
import { getROIAnalytics } from "@/utils/aiAnalytics";
import { AICompatibilityScore } from "@/components/compare/AICompatibilityScore";
import { SmartFeatureMatch } from "@/components/compare/SmartFeatureMatch";
import CompareROI from "@/components/compare/CompareROI";
import { ComparisonFeature, FeatureCategory } from "@/types/aiTypes";

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

  const { data: featureCategories = [], isLoading: isLoadingFeatures } = useQuery({
    queryKey: ['feature-categories'],
    queryFn: async () => {
      const { data: categories, error: categoriesError } = await supabase
        .from('comparison_categories')
        .select('*')
        .order('sort_order');

      if (categoriesError) throw categoriesError;

      const { data: features, error: featuresError } = await supabase
        .from('comparison_feature_definitions')
        .select('*')
        .order('sort_order');

      if (featuresError) throw featuresError;

      return categories.map(category => ({
        name: category.name,
        description: category.description || '',
        features: features
          .filter(f => f.category_id === category.id)
          .map(f => ({
            name: f.name,
            importance: f.importance || 'medium',
            category: category.name,
            description: f.description || '',
            values: selectedTools.map(tool => ({
              toolId: tool.id,
              value: 'Pending evaluation',
              confidenceScore: 0.5
            }))
          }))
      }));
    },
    enabled: selectedTools.length > 0
  });

  const { data: evaluations = [] } = useQuery({
    queryKey: ['tool-evaluations', selectedTools.map(t => t.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tool_feature_evaluations')
        .select(`
          *,
          feature:comparison_feature_definitions(
            name,
            importance,
            category_id
          )
        `)
        .in('tool_id', selectedTools.map(t => t.id));

      if (error) throw error;
      return data;
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
              className="flex items-center gap-2 text-gray-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Compare Different Tools
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleExport('csv')}
                className="flex items-center gap-2 text-blue-600"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button
                variant="default"
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

          {featureCategories.length > 0 && (
            <SmartFeatureMatch
              tools={selectedTools}
              featureCategories={featureCategories}
            />
          )}

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
