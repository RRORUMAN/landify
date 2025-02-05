
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ComparePricingProps {
  tools: Tool[];
}

const ComparePricing = ({ tools }: ComparePricingProps) => {
  const pricingTiers = ["Free", "Pro", "Business", "Enterprise"];
  
  const pricingData = {
    "Free": {
      price: 0,
      features: ["Basic Features", "Limited API Access", "Community Support"]
    },
    "Pro": {
      price: 29,
      features: ["Advanced Features", "Full API Access", "Priority Support", "Custom Integrations"]
    },
    "Business": {
      price: 99,
      features: ["Enterprise Features", "Dedicated Support", "SLA Guarantee", "Custom Development"]
    },
    "Enterprise": {
      price: "Custom",
      features: ["Custom Features", "24/7 Support", "Custom SLA", "On-Premise Option"]
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Pricing Comparison</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Plan</TableHead>
                {tools.map((tool) => (
                  <TableHead key={tool.id}>
                    <div className="flex items-center gap-2">
                      <img src={tool.logo} alt={tool.name} className="w-6 h-6 rounded" />
                      {tool.name}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingTiers.map((tier) => (
                <TableRow key={tier}>
                  <TableCell className="font-medium">
                    <div className="flex items-center justify-between">
                      <span>{tier}</span>
                      {tier === "Pro" && (
                        <Badge variant="secondary" className="ml-2">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  {tools.map((tool) => (
                    <TableCell key={`${tool.id}-${tier}`}>
                      <div className="space-y-2">
                        <div className="flex items-center gap-1">
                          {tier === "Enterprise" ? (
                            <span className="text-sm font-medium">Contact Sales</span>
                          ) : (
                            <>
                              <DollarSign className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                {tier === "Free" ? "0" : pricingData[tier].price}
                              </span>
                              <span className="text-sm text-gray-500">/month</span>
                            </>
                          )}
                        </div>
                        <div className="space-y-1">
                          {pricingData[tier].features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <Check className="h-4 w-4 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} className="space-y-4">
              <div className="flex items-center gap-2">
                <img src={tool.logo} alt={tool.name} className="w-8 h-8 rounded" />
                <h4 className="font-medium">{tool.name}</h4>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• {tool.bookmarks}+ active users</p>
                <p>• {tool.reviews} verified reviews</p>
                <p>• {tool.rating}/5 average rating</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ComparePricing;
