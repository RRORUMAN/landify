import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DetailedComparison, ComparisonFeature } from "@/types/aiTypes";
import ToolHeader from "./features/ToolHeader";
import FeatureGroup from "./features/FeatureGroup";
import PerformanceComparison from "./detailed/PerformanceComparison";
import UseCaseComparison from "./detailed/UseCaseComparison";
import SecurityComparison from "./detailed/SecurityComparison";
import ResourceComparison from "./detailed/ResourceComparison";
import PricingComparison from "./detailed/PricingComparison";
import { AICompatibilityScore } from "./AICompatibilityScore";

interface CompareFeatureGridProps {
  tools: Tool[];
}

const CompareFeatureGrid = ({ tools }: CompareFeatureGridProps) => {
  const { data: features = [], isLoading: isFeaturesLoading } = useQuery({
    queryKey: ['comparison_features', tools.map(t => t.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comparison_features')
        .select('*')
        .in('tool_id', tools.map(t => t.id))
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: detailedComparisons = {}, isLoading: isDetailsLoading } = useQuery({
    queryKey: ['detailed_comparisons', tools.map(t => t.id)],
    queryFn: async () => {
      const toolComparisons: Record<string, DetailedComparison> = {};

      for (const tool of tools) {
        const { data: performance } = await supabase
          .from('tool_performance')
          .select('*')
          .eq('tool_id', tool.id)
          .single();

        const { data: useCases } = await supabase
          .from('tool_use_cases')
          .select('*')
          .eq('tool_id', tool.id);

        const { data: security } = await supabase
          .from('tool_security')
          .select('*')
          .eq('tool_id', tool.id);

        const { data: resources } = await supabase
          .from('tool_resources')
          .select('*')
          .eq('tool_id', tool.id);

        const { data: pricing } = await supabase
          .from('tool_pricing_details')
          .select('*')
          .eq('tool_id', tool.id);

        toolComparisons[tool.id] = {
          performance: performance || {},
          useCases: useCases || [],
          security: security || [],
          resources: resources || [],
          pricing: pricing || [],
        };
      }

      return toolComparisons;
    }
  });

  const { data: metrics = [] } = useQuery({
    queryKey: ['performance_metrics', tools.map(t => t.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .in('tool_id', tools.map(t => t.id));
      
      if (error) throw error;
      return data;
    }
  });

  const featuresByGroup = features.reduce((acc, feature) => {
    const groupKey = `${feature.feature_category}/${feature.feature_group}`;
    if (!acc[groupKey]) {
      acc[groupKey] = {
        category: feature.feature_category,
        group: feature.feature_group,
        features: new Set<string>()
      };
    }
    acc[groupKey].features.add(feature.feature_name);
    return acc;
  }, {} as Record<string, { category: string; group: string; features: Set<string> }>);

  const getFeatureValue = (toolId: string, featureName: string): ComparisonFeature | undefined => {
    const feature = features.find(
      f => f.tool_id === toolId && f.feature_name === featureName
    );
    
    if (!feature) return undefined;

    return {
      id: feature.id,
      feature_name: feature.feature_name,
      feature_category: feature.feature_category,
      feature_value: feature.feature_value,
      feature_details: feature.feature_details as Record<string, any>,
      importance: feature.importance as 'high' | 'medium' | 'low',
      feature_group: feature.feature_group,
      help_text: feature.help_text
    };
  };

  const getMetricForTool = (toolId: string) => {
    return metrics.find(m => m.tool_id === toolId);
  };

  const getDetailedComparison = (toolId: string) => {
    return detailedComparisons[toolId];
  };

  if (isFeaturesLoading || isDetailsLoading) {
    return <div className="text-center py-8">Loading comparison data...</div>;
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* AI Compatibility Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const comparison = getDetailedComparison(tool.id);
            if (!comparison) return null;
            
            return (
              <AICompatibilityScore
                key={tool.id}
                score={comparison.performance?.accuracy_score || 0}
                factors={{
                  'API Reliability': comparison.performance?.api_reliability_score || 0,
                  'Cost Efficiency': comparison.performance?.cost_efficiency_score || 0,
                  'Support Quality': comparison.performance?.support_quality_score || 0,
                }}
                useCases={comparison.useCases?.map(uc => uc.use_case) || []}
              />
            );
          })}
        </div>

        {/* Detailed Comparisons */}
        <Card className="p-6">
          <div className="sticky top-0 bg-white z-10 pb-4 border-b">
            <div className="grid grid-cols-[1fr,repeat(4,1fr)] gap-4">
              <div className="font-semibold text-gray-500">Feature</div>
              {tools.map((tool) => (
                <ToolHeader
                  key={tool.id}
                  tool={tool}
                  metric={getMetricForTool(tool.id)}
                />
              ))}
            </div>
          </div>

          <ScrollArea className="h-[600px] mt-4">
            {/* Performance Metrics */}
            <PerformanceComparison
              tools={tools}
              getDetailedComparison={getDetailedComparison}
            />

            {/* Use Cases */}
            <UseCaseComparison
              tools={tools}
              getDetailedComparison={getDetailedComparison}
            />

            {/* Security Features */}
            <SecurityComparison
              tools={tools}
              getDetailedComparison={getDetailedComparison}
            />

            {/* Resources & Training */}
            <ResourceComparison
              tools={tools}
              getDetailedComparison={getDetailedComparison}
            />

            {/* Pricing Analysis */}
            <PricingComparison
              tools={tools}
              getDetailedComparison={getDetailedComparison}
            />

            {/* Feature Groups */}
            {Object.entries(featuresByGroup).map(([groupKey, { category, group, features: featureSet }]) => (
              <FeatureGroup
                key={groupKey}
                category={category}
                group={group}
                features={featureSet}
                tools={tools}
                getFeatureValue={getFeatureValue}
              />
            ))}
          </ScrollArea>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default CompareFeatureGrid;
