
import { Tool } from "@/data/types";
import { DetailedComparison } from "@/types/aiTypes";
import { Card } from "@/components/ui/card";
import { Shield, Check, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SecurityComparisonProps {
  tools: Tool[];
  getDetailedComparison: (toolId: string) => DetailedComparison | undefined;
}

const SecurityComparison = ({ tools, getDetailedComparison }: SecurityComparisonProps) => {
  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-lg font-semibold">Security & Compliance</h3>
      <div className="grid gap-4">
        {tools.map((tool) => {
          const comparison = getDetailedComparison(tool.id);
          const security = comparison?.security || [];

          return (
            <Card key={tool.id} className="p-4">
              <h4 className="font-medium mb-4">{tool.name}</h4>
              <div className="space-y-4">
                {security.map((feature, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <h5 className="font-medium text-sm">{feature.security_feature}</h5>
                      </div>
                      <Badge variant={feature.security_score >= 0.8 ? "success" : "warning"}>
                        Score: {Math.round(feature.security_score * 100)}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium">Compliance Standards:</span>
                        <div className="mt-1 space-y-1">
                          {feature.compliance_standards.map((standard, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>{standard}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm">
                          <span className="font-medium">Certification Status: </span>
                          <span>{feature.certification_status}</span>
                        </div>
                        <div className="text-sm mt-1">
                          <span className="font-medium">Last Audit: </span>
                          <span>{new Date(feature.last_audit_date).toLocaleDateString()}</span>
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

export default SecurityComparison;
