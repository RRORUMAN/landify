
import { DollarSign, Building2, Zap, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { UserTool } from "@/data/types";

interface AnalyticsSummaryCardsProps {
  userTools: UserTool[];
  monthlySpend: number;
  metrics: any[];
}

export const AnalyticsSummaryCards = ({
  userTools,
  monthlySpend,
  metrics
}: AnalyticsSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Monthly Spend</p>
            <p className="text-2xl font-semibold">${monthlySpend.toFixed(2)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Building2 className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Tools</p>
            <p className="text-2xl font-semibold">{userTools.length}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Zap className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Time Saved</p>
            <p className="text-2xl font-semibold">
              {metrics.reduce((sum, m) => sum + (m.time_saved_per_task || 0), 0)}min/day
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Users className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-semibold">
              {userTools.reduce((sum, t) => sum + ((t.tool?.monthly_active_users) || 0), 0)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
