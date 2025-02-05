
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Calculator } from "lucide-react";

interface CompareROIProps {
  tools: Tool[];
}

const CompareROI = ({ tools }: CompareROIProps) => {
  const [hoursPerWeek, setHoursPerWeek] = useState("10");
  const [hourlyRate, setHourlyRate] = useState("50");

  const calculateROI = (tool: Tool) => {
    const hours = parseFloat(hoursPerWeek);
    const rate = parseFloat(hourlyRate);
    const monthlyHours = hours * 4;
    const monthlyValue = monthlyHours * rate;
    const subscriptionCost = tool.pricing === "Free" ? 0 : 20; // Default to $20 if not free

    const timeSavings = 0.2; // Assume 20% time savings
    const monthlySavings = monthlyValue * timeSavings;
    const annualSavings = monthlySavings * 12;
    const annualCost = subscriptionCost * 12;
    const netROI = ((annualSavings - annualCost) / annualCost) * 100;

    return {
      monthlySavings: monthlySavings.toFixed(2),
      annualSavings: annualSavings.toFixed(2),
      annualCost: annualCost.toFixed(2),
      roi: netROI.toFixed(0)
    };
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold">ROI Calculator</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="hoursPerWeek">Hours spent on tasks per week</Label>
          <Input
            id="hoursPerWeek"
            type="number"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="hourlyRate">Hourly rate (USD)</Label>
          <Input
            id="hourlyRate"
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => {
          const roi = calculateROI(tool);
          return (
            <Card key={tool.id} className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <img src={tool.logo} alt={tool.name} className="w-8 h-8 rounded" />
                <h3 className="font-medium">{tool.name}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Monthly Savings:</span>
                  <span className="font-medium">${roi.monthlySavings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Annual Savings:</span>
                  <span className="font-medium">${roi.annualSavings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Annual Cost:</span>
                  <span className="font-medium">${roi.annualCost}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-500">Estimated ROI:</span>
                  <span className="font-medium text-green-600">{roi.roi}%</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default CompareROI;
