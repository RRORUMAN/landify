
import { Tool } from "@/data/types";
import { DetailedComparison } from "@/types/aiTypes";
import { Card } from "@/components/ui/card";
import { DollarSign, Check, AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PricingComparisonProps {
  tools: Tool[];
  getDetailedComparison: (toolId: string) => DetailedComparison | undefined;
}

const PricingComparison = ({ tools, getDetailedComparison }: PricingComparisonProps) => {
  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-lg font-semibold">Pricing Analysis</h3>
      <div className="grid gap-4">
        {tools.map((tool) => {
          const comparison = getDetailedComparison(tool.id);
          const pricing = comparison?.pricing || [];

          return (
            <Card key={tool.id} className="p-4">
              <h4 className="font-medium mb-4">{tool.name}</h4>
              <div className="space-y-6">
                {pricing.map((plan, index) => (
                  <div key={index} className="border-b pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium">{plan.plan_name}</h5>
                        {index === 1 && (
                          <Badge variant="default" className="bg-blue-500">
                            Most Popular
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-xl font-bold">{plan.monthly_cost}</span>
                        <span className="text-sm text-gray-500">/month</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h6 className="text-sm font-medium mb-2">Features Included:</h6>
                        <div className="space-y-2">
                          {plan.features_included.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h6 className="text-sm font-medium mb-2">Usage Limits:</h6>
                          <div className="space-y-1">
                            {Object.entries(plan.usage_limits).map(([limit, value], idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                <span>{limit}: {value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h6 className="text-sm font-medium mb-2">Additional Info:</h6>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-500" />
                              <span>Minimum Commitment: {plan.minimum_commitment}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PricingComparison;
