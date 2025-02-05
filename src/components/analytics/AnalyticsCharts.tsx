
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import type { UserTool, SpendForecast } from "@/data/types";

interface AnalyticsChartsProps {
  forecasts: SpendForecast[];
  userTools: UserTool[];
  metrics: any[];
}

export const AnalyticsCharts = ({ forecasts, userTools, metrics }: AnalyticsChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Monthly Spending Trend</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecasts.map(f => ({
              date: format(new Date(f.forecast_date), 'MMM dd'),
              amount: f.forecasted_amount
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ fill: '#8884d8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Tool Performance</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userTools.map(tool => ({
              name: tool.tool?.name || 'Unknown',
              roi: metrics.find(m => m.tool_id === tool.tool_id)?.roi_score || 0,
              efficiency: metrics.find(m => m.tool_id === tool.tool_id)?.automation_score || 0
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="roi" fill="#8884d8" name="ROI Score" />
              <Bar dataKey="efficiency" fill="#82ca9d" name="Efficiency Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
