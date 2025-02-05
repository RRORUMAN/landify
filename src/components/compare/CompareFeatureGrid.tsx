
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import ToolHeader from "./features/ToolHeader";
import FeatureGroup from "./features/FeatureGroup";

interface CompareFeatureGridProps {
  tools: Tool[];
}

interface Feature {
  tool_id: string;
  feature_category: string;
  feature_group: string;
  feature_name: string;
  feature_value: string;
  is_premium: boolean;
  importance: 'high' | 'medium' | 'low';
  help_text: string | null;
  sort_order: number;
}

const CompareFeatureGrid = ({ tools }: CompareFeatureGridProps) => {
  const { data: features = [], isLoading } = useQuery({
    queryKey: ['comparison_features', tools.map(t => t.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comparison_features')
        .select('*')
        .in('tool_id', tools.map(t => t.id))
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Feature[];
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

  const getFeatureValue = (toolId: string, featureName: string) => {
    return features.find(
      f => f.tool_id === toolId && f.feature_name === featureName
    );
  };

  const getMetricForTool = (toolId: string) => {
    return metrics.find(m => m.tool_id === toolId);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading features comparison...</div>;
  }

  return (
    <TooltipProvider>
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
    </TooltipProvider>
  );
};

export default CompareFeatureGrid;
