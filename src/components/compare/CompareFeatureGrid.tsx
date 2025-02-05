
import { Tool } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X, Minus, Star, Zap, DollarSign, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CompareFeatureGridProps {
  tools: Tool[];
}

interface Feature {
  tool_id: string;
  feature_category: string;
  feature_name: string;
  feature_value: string;
  is_premium: boolean;
}

const CompareFeatureGrid = ({ tools }: CompareFeatureGridProps) => {
  const { data: features = [], isLoading } = useQuery({
    queryKey: ['comparison_features', tools.map(t => t.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comparison_features')
        .select('*')
        .in('tool_id', tools.map(t => t.id));
      
      if (error) throw error;
      return data as Feature[];
    }
  });

  // Group features by category
  const featuresByCategory = features.reduce((acc, feature) => {
    if (!acc[feature.feature_category]) {
      acc[feature.feature_category] = new Set();
    }
    acc[feature.feature_category].add(feature.feature_name);
    return acc;
  }, {} as Record<string, Set<string>>);

  const getFeatureValue = (toolId: string, featureName: string) => {
    const feature = features.find(
      f => f.tool_id === toolId && f.feature_name === featureName
    );
    return feature?.feature_value;
  };

  const renderFeatureValue = (value: string | undefined, isPremium: boolean) => {
    if (!value) return <X className="h-5 w-5 text-red-500" />;
    if (value === "true") return <Check className="h-5 w-5 text-green-500" />;
    if (value === "false") return <Minus className="h-5 w-5 text-gray-400" />;
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">{value}</span>
        {isPremium && (
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
        {Object.entries(featuresByCategory).map(([category, featureNames]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold mb-4 sticky top-0 bg-white py-2">{category}</h3>
            <div className="space-y-4">
              {Array.from(featureNames).map((featureName) => {
                const feature = features.find(f => f.feature_name === featureName);
                return (
                  <div
                    key={featureName}
                    className="grid grid-cols-[1fr,repeat(4,1fr)] gap-4 items-center py-2 border-t border-gray-100 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{featureName}</span>
                      {feature?.is_premium && (
                        <Badge variant="secondary" className="text-xs">
                          Premium
                        </Badge>
                      )}
                    </div>
                    {tools.map((tool) => (
                      <div key={tool.id} className="flex justify-center">
                        {renderFeatureValue(
                          getFeatureValue(tool.id, featureName),
                          feature?.is_premium || false
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
  );
};

export default CompareFeatureGrid;
