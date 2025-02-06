
import { Zap, Timer, BarChart3 } from "lucide-react";
import MetricBar from "./MetricBar";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PerformanceIndicatorsProps {
  metrics: any;
}

const PerformanceIndicators = ({ metrics }: PerformanceIndicatorsProps) => {
  const getTrendIndicator = (value: number, threshold: number = 7.5) => {
    if (value >= threshold) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <h4 className="font-medium text-sm text-gray-900">Performance Indicators</h4>
      <MetricBar
        icon={Zap}
        title="Ease of Use"
        value={metrics?.ease_of_use_score}
        max={10}
        color="bg-blue-500"
        trend={getTrendIndicator(metrics?.ease_of_use_score || 0)}
      />
      <MetricBar
        icon={Timer}
        title="Time Saved per Task"
        value={metrics?.time_saved_per_task}
        max={30}
        unit="min"
        color="bg-green-500"
        trend={getTrendIndicator(metrics?.time_saved_per_task || 0, 15)}
      />
      <MetricBar
        icon={BarChart3}
        title="ROI Score"
        value={metrics?.roi_score}
        max={10}
        color="bg-purple-500"
        trend={getTrendIndicator(metrics?.roi_score || 0)}
      />
    </div>
  );
};

export default PerformanceIndicators;
