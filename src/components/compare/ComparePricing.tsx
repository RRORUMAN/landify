
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

interface ComparePricingProps {
  tools: Tool[];
}

const ComparePricing = ({ tools }: ComparePricingProps) => {
  const pricingTiers = ["Free", "Pro", "Business", "Enterprise"];
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Pricing Comparison</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plan</TableHead>
            {tools.map((tool) => (
              <TableHead key={tool.id}>{tool.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pricingTiers.map((tier) => (
            <TableRow key={tier}>
              <TableCell className="font-medium">{tier}</TableCell>
              {tools.map((tool) => (
                <TableCell key={`${tool.id}-${tier}`}>
                  {tier === "Free" ? (
                    <span className="text-sm">$0/mo</span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm">
                        {Math.floor(Math.random() * 100 + 10)}/mo
                      </span>
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ComparePricing;
