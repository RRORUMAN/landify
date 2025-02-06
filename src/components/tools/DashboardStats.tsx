
import { Card } from "@/components/ui/card";
import type { UserTool } from "@/data/types";

interface DashboardStatsProps {
  monthlySpend: number;
  activeToolsCount: number;
  mostUsedCategory: string;
}

export const DashboardStats = ({ monthlySpend, activeToolsCount, mostUsedCategory }: DashboardStatsProps) => {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Monthly Spend</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold text-[#2563EB]">${monthlySpend.toFixed(2)}</p>
            <p className="ml-2 text-sm text-gray-500">/ month</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Active Tools</h3>
          <p className="mt-2 text-3xl font-semibold text-[#2563EB]">{activeToolsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Most Used Category</h3>
          <p className="mt-2 text-3xl font-semibold text-[#2563EB]">{mostUsedCategory}</p>
        </div>
      </div>
    </Card>
  );
};
