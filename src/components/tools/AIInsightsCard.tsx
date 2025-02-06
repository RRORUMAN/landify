
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Activity, AlertTriangle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { AIAnalysis } from "@/utils/toolAnalytics";

interface AIInsightsCardProps {
  aiAnalysis: AIAnalysis;
  activeToolsCount: number;
}

export const AIInsightsCard = ({ aiAnalysis, activeToolsCount }: AIInsightsCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/50 dark:to-blue-900/50 p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold">AI Insights</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Based on your usage patterns, we've identified potential optimizations
          </p>
        </div>
        <Badge variant="outline" className="bg-purple-100 text-purple-600 border-purple-200">
          Updated {format(new Date(aiAnalysis.recommendations.analysis_date), 'MMM dd, yyyy')}
        </Badge>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Potential Monthly Savings</span>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600 mt-2">${aiAnalysis.potential_savings.toFixed(2)}</p>
        </Card>
        <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Current Utilization</span>
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {Math.round((activeToolsCount / aiAnalysis.recommendations.total_tools) * 100)}%
          </p>
        </Card>
        <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Optimization Score</span>
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {Math.round((aiAnalysis.potential_savings / aiAnalysis.total_spend) * 100)}%
          </p>
        </Card>
      </div>
      <Button
        variant="link"
        className="mt-4 text-purple-600 hover:text-purple-700 p-0"
        onClick={() => navigate("/tools/optimization")}
      >
        View detailed analysis <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </Card>
  );
};
