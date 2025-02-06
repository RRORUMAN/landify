
import { type LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface MetricBarProps {
  icon: LucideIcon;
  title: string;
  value?: number | null;
  max: number;
  unit?: string;
  color: string;
  trend?: React.ReactNode;
}

const MetricBar = ({ icon: Icon, title, value, max, unit, color, trend }: MetricBarProps) => {
  if (!value) return null;

  const percentage = (value / max) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            {value}{unit}
          </span>
          {trend}
        </div>
      </div>
      <Progress value={percentage} className={`h-2 ${color}`} />
    </div>
  );
};

export default MetricBar;
