
import { Tool } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X, Minus, Star, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  // Group features by category and group
  const featuresByGroup = features.reduce((acc, feature) => {
    const groupKey = `${feature.feature_category}/${feature.feature_group || 'General'}`;
    if (!acc[groupKey]) {
      acc[groupKey] = {
        category: feature.feature_category,
        group: feature.feature_group || 'General',
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

  const renderImportanceBadge = (importance: 'high' | 'medium' | 'low') => {
    const colors = {
      high: 'text-red-500 bg-red-50',
      medium: 'text-yellow-500 bg-yellow-50',
      low: 'text-green-500 bg-green-50'
    };

    return (
      <Badge variant="secondary" className={`text-xs ${colors[importance]}`}>
        {importance}
      </Badge>
    );
  };

  const renderFeatureValue = (value: string | undefined, feature: Feature | undefined) => {
    if (!feature) return <X className="h-5 w-5 text-red-500" />;
    if (value === "true") return <Check className="h-5 w-5 text-green-500" />;
    if (value === "false") return <Minus className="h-5 w-5 text-gray-400" />;
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">{value}</span>
        {feature.is_premium && (
          <Badge variant="secondary" className="text-xs">
            Premium
          </Badge>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading features...</div>;
  }

  return (
    <TooltipProvider>
      <Card className="p-6">
        <div className="sticky top-0 bg-white z-10 pb-4 border-b">
          <div className="grid grid-cols-[1fr,repeat(4,1fr)] gap-4">
            <div className="font-semibold text-gray-500">Feature</div>
            {tools.map((tool) => (
              <div key={tool.id} className="flex flex-col items-center gap-2 p-2 rounded-lg bg-gray-50">
                <img src={tool.logo} alt={tool.name} className="w-10 h-10 rounded-lg" />
                <span className="font-semibold text-sm text-center">{tool.name}</span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Star className="h-3 w-3 text-yellow-400" />
                  {tool.rating}/5
                </div>
              </div>
            ))}
          </div>
        </div>

        <ScrollArea className="h-[600px] mt-4">
          {Object.entries(featuresByGroup).map(([groupKey, { category, group, features: featureSet }]) => (
            <div key={groupKey} className="mb-8">
              <div className="sticky top-0 bg-white py-2">
                <h3 className="text-lg font-semibold mb-2">{category}</h3>
                <p className="text-sm text-gray-500 mb-4">{group}</p>
              </div>
              <div className="space-y-4">
                {Array.from(featureSet).map((featureName) => {
                  const feature = features.find(f => f.feature_name === featureName);
                  return (
                    <div
                      key={featureName}
                      className="grid grid-cols-[1fr,repeat(4,1fr)] gap-4 items-center py-2 border-t border-gray-100 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{featureName}</span>
                            {feature?.help_text && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">{feature.help_text}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          {feature?.importance && (
                            <div>{renderImportanceBadge(feature.importance)}</div>
                          )}
                        </div>
                      </div>
                      {tools.map((tool) => (
                        <div key={tool.id} className="flex justify-center">
                          {renderFeatureValue(
                            getFeatureValue(tool.id, featureName)?.feature_value,
                            getFeatureValue(tool.id, featureName)
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </TooltipProvider>
  );
};

export default CompareFeatureGrid;
