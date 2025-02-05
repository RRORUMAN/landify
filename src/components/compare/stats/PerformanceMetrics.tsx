
import { Tool } from "@/data/types";
import { Heart, Clock, BarChart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PerformanceMetricsProps {
  metrics: any;
}

const PerformanceMetrics = ({ metrics }: PerformanceMetricsProps) => {
  return (
    <div className="space-y-4">
      <TooltipProvider>
        <div className="flex items-center justify-between">
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium">Ease of Use</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>How easy the tool is to use and learn</p>
            </TooltipContent>
          </Tooltip>
          <span className="text-sm">{metrics?.ease_of_use_score?.toFixed(1) ?? 'N/A'}/10</span>
        </div>

        <div className="flex items-center justify-between">
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Time Saved</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Average time saved per task using this tool</p>
            </TooltipContent>
          </Tooltip>
          <span className="text-sm">{metrics?.time_saved_per_task ?? 'N/A'} min/task</span>
        </div>

        <div className="flex items-center justify-between">
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">ROI Score</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Return on Investment score based on user feedback</p>
            </TooltipContent>
          </Tooltip>
          <span className="text-sm">{metrics?.roi_score?.toFixed(1) ?? 'N/A'}/10</span>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default PerformanceMetrics;
