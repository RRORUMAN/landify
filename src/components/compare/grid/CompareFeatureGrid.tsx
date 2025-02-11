import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ComparisonFeature, DetailedComparison, ToolFeatureMatrix } from "@/types/aiTypes";
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
      const { data: featureData, error: featureError } = await supabase
        .from('comparison_features')
        .select(`
          *,
          feature_comparison_matrix!inner(
            feature_score,
            confidence_score,
            implementation_quality,
            feature_details,
            notes
          )
        `)
        .in('tool_id', tools.map(t => t.id))
        .order('sort_order', { ascending: true });
      
      if (featureError) throw featureError;

      return (featureData || []).map(feature => {
        const matrix = feature.feature_comparison_matrix?.[0] || {};
        const details = feature.feature_details || {};
        
        const implementationDetails = {
          feature_score: Number(matrix?.feature_score) || 0,
          confidence_score: Number(matrix?.confidence_score) || 0,
          implementation_quality: matrix?.implementation_quality || '',
          feature_details: matrix?.feature_details || {},
          notes: matrix?.notes || ''
        };

        return {
          id: feature.id,
          tool_id: feature.tool_id,
          feature_name: feature.feature_name,
          feature_category: feature.feature_category,
          feature_value: feature.feature_value,
          feature_details: details,
          importance: feature.importance || 'medium',
          feature_group: feature.feature_group,
          help_text: feature.help_text,
          is_premium: feature.is_premium,
          sort_order: feature.sort_order,
          name: feature.feature_name,
          description: feature.feature_details?.description || '',
          confidence_score: feature.confidence_score || 0.8,
          implementation_details: implementationDetails,
          values: [],
          implementation_quality: feature.implementation_quality,
          feature_limitations: feature.feature_limitations,
          verification_source_url: feature.verification_source_url,
          comparison_note: feature.comparison_note
        } as ComparisonFeature;
      });
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
          performance: performance || undefined,
          useCases: useCases?.map(uc => ({
            use_case: uc.use_case,
            effectiveness_score: uc.effectiveness_score || 0,
            implementation_complexity: uc.implementation_complexity || 0,
            time_savings: uc.time_savings || 0,
            cost_impact: uc.cost_impact || 0,
            details: typeof uc.details === 'object' ? uc.details || {} : {}
          })) || [],
          security: security?.map(s => ({
            security_feature: s.security_feature,
            security_score: s.security_score || 0,
            compliance_standards: s.compliance_standards || [],
            certification_status: s.certification_status || '',
            last_audit_date: s.last_audit_date || '',
            details: typeof s.details === 'object' ? s.details || {} : {}
          })) || [],
          resources: resources?.map(r => ({
            resource_type: r.resource_type,
            quality_score: r.quality_score || 0,
            accessibility_score: r.accessibility_score || 0,
            comprehensiveness_score: r.comprehensiveness_score || 0,
            update_frequency: r.update_frequency || '',
            details: typeof r.details === 'object' ? r.details || {} : {}
          })) || [],
          pricing: pricing?.map(p => ({
            plan_name: p.plan_name,
            monthly_cost: p.monthly_cost || 0,
            features_included: p.features_included || [],
            usage_limits: typeof p.usage_limits === 'object' ? p.usage_limits || {} : {},
            minimum_commitment: p.minimum_commitment || '',
            overage_costs: typeof p.overage_costs === 'object' ? p.overage_costs || {} : {},
            details: typeof p.details === 'object' ? p.details || {} : {}
          })) || []
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
        features: new Set<string>(),
        confidence: feature.confidence_score,
        summary: feature.feature_details?.summary || {}
      };
    }
    acc[groupKey].features.add(feature.feature_name);
    return acc;
  }, {} as Record<string, { 
    category: string; 
    group: string; 
    features: Set<string>;
    confidence: number;
    summary: Record<string, any>;
  }>);

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
