
import { Heart, Clock, TrendingUp } from "lucide-react";

interface PerformanceMetricsProps {
  metrics: {
    ease_of_use_score?: number;
    time_saved_per_task?: number;
    roi_score?: number;
  };
}

const PerformanceMetrics = ({ metrics }: PerformanceMetricsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium">Ease of Use</span>
        </div>
        <span className="text-lg font-semibold">{metrics?.ease_of_use_score?.toFixed(1)}/10</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">Time Saved</span>
        </div>
        <span className="text-lg font-semibold">{metrics?.time_saved_per_task} min/task</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">ROI Score</span>
        </div>
        <span className="text-lg font-semibold">{metrics?.roi_score?.toFixed(1)}/10</span>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
