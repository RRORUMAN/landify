
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ComparisonFeature, DetailedComparison } from "@/types/aiTypes";
import AICompatibilitySection from "./AICompatibilitySection";
import ComparisonHeader from "./ComparisonHeader";
import DetailedComparisons from "./DetailedComparison";
import FeatureGroupList from "./FeatureGroupList";

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
      return data.map(feature => ({
        ...feature,
        feature_details: feature.feature_details as Record<string, any>,
        name: feature.feature_name,
        description: (feature.feature_details as Record<string, any>)?.description || '',
        values: []
      })) as ComparisonFeature[];
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
          performance: performance ? {
            accuracy_score: performance.accuracy_score || 0,
            response_time: performance.response_time || 0,
            scalability_score: performance.scalability_score || 0,
            ease_of_use_score: performance.ease_of_use_score || 0,
            cost_efficiency_score: performance.cost_efficiency_score || 0,
            support_quality_score: performance.support_quality_score || 0,
            api_reliability_score: performance.api_reliability_score || 0,
            customization_score: performance.customization_score || 0,
            update_frequency: performance.update_frequency || 0,
          } : {} as DetailedComparison['performance'],
          useCases: (useCases || []).map(uc => ({
            ...uc,
            details: uc.details as Record<string, any>
          })),
          security: (security || []).map(s => ({
            ...s,
            details: s.details as Record<string, any>
          })),
          resources: (resources || []).map(r => ({
            ...r,
            details: r.details as Record<string, any>
          })),
          pricing: (pricing || []).map(p => ({
            ...p,
            usage_limits: p.usage_limits as Record<string, any>,
            overage_costs: p.overage_costs as Record<string, any>,
            details: p.details as Record<string, any>
          }))
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
      ...feature,
      name: feature.feature_name,
      description: feature.feature_details?.description || '',
      values: []
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
        <AICompatibilitySection
          tools={tools}
          getDetailedComparison={getDetailedComparison}
        />

        <Card className="p-6">
          <ComparisonHeader
            tools={tools}
            getMetricForTool={getMetricForTool}
          />

          <ScrollArea className="h-[600px] mt-4">
            <DetailedComparisons
              tools={tools}
              getDetailedComparison={getDetailedComparison}
            />

            <FeatureGroupList
              featuresByGroup={featuresByGroup}
              tools={tools}
              getFeatureValue={getFeatureValue}
            />
          </ScrollArea>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default CompareFeatureGrid;
