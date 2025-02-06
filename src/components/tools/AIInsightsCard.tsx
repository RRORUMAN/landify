
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sparkles, 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  ChevronRight, 
  DollarSign,
  Zap,
  ArrowDownRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { AIAnalysis } from "@/utils/toolAnalytics";

interface AIInsightsCardProps {
  aiAnalysis: AIAnalysis;
  activeToolsCount: number;
}

export const AIInsightsCard = ({ aiAnalysis, activeToolsCount }: AIInsightsCardProps) => {
  const navigate = useNavigate();
  
  const optimizationTips = [
    {
      title: "Unused Subscriptions",
      description: "Consider pausing or canceling tools with low usage",
      saving: aiAnalysis.potential_savings * 0.4,
      icon: DollarSign
    },
    {
      title: "Plan Optimization",
      description: "Downgrade plans for tools with features you don't use",
      saving: aiAnalysis.potential_savings * 0.3,
      icon: Zap
    },
    {
      title: "Bundle Opportunities",
      description: "Combine similar tools or use integrated solutions",
      saving: aiAnalysis.potential_savings * 0.3,
      icon: ArrowDownRight
    }
  ];
  
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/50 dark:to-blue-900/50 p-6">
      <div className="flex items-start justify-between mb-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</span>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600 mt-2">${aiAnalysis.potential_savings.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">Potential monthly reduction</p>
        </Card>
        <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Tool Utilization</span>
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {Math.round((activeToolsCount / aiAnalysis.recommendations.total_tools) * 100)}%
          </p>
          <p className="text-xs text-gray-500 mt-1">Of tools actively used</p>
        </Card>
        <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Optimization Score</span>
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {Math.round((aiAnalysis.potential_savings / aiAnalysis.total_spend) * 100)}%
          </p>
          <p className="text-xs text-gray-500 mt-1">Room for improvement</p>
        </Card>
      </div>

      <ScrollArea className="h-48 rounded-lg bg-white/80 dark:bg-gray-800/80 p-4 mb-4">
        <div className="space-y-4">
          {optimizationTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                <tip.icon className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{tip.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
                <p className="text-sm font-medium text-green-600 mt-1">
                  Potential savings: ${tip.saving.toFixed(2)}/month
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Button
        variant="link"
        className="text-purple-600 hover:text-purple-700 p-0"
        onClick={() => navigate("/tools/optimization")}
      >
        View detailed analysis <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </Card>
  );
};
