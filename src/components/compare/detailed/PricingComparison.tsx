
import { DetailedComparison } from "@/types/aiTypes";
import { Card } from "@/components/ui/card";
import { Tool } from "@/data/types";

interface PricingComparisonProps {
  tools: Tool[];
  getDetailedComparison: (toolId: string) => DetailedComparison | undefined;
}

const PricingComparison = ({ tools, getDetailedComparison }: PricingComparisonProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Pricing Comparison</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const details = getDetailedComparison(tool.id);
          const pricing = details?.pricing || [];

          return (
            <Card key={tool.id} className="p-4">
              <h4 className="font-medium mb-2">{tool.name}</h4>
              <div className="space-y-2">
                {pricing.map((plan: any, index: number) => (
                  <div key={index} className="border-b pb-2 last:border-0">
                    <p className="font-medium">{plan.plan_name || 'Plan'}</p>
                    <p className="text-sm text-gray-600">
                      ${plan.monthly_cost || 0}/month
                    </p>
                    {plan.features_included && (
                      <ul className="mt-2 space-y-1">
                        {plan.features_included.map((feature: string, i: number) => (
                          <li key={i} className="text-sm text-gray-500">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default PricingComparison;
