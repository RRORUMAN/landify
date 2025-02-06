
import { type LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value?: number | null;
  max?: number;
  unit?: string;
  color: string;
  trend?: React.ReactNode;
  inverse?: boolean;
}

const MetricCard = ({ icon: Icon, title, value, max, unit, color, trend, inverse }: MetricCardProps) => {
  if (!value) return null;

  const displayValue = inverse ? 
    `${value}${unit}` :
    `${value}${unit ?? ` / ${max}`}`;

  return (
    <div className="p-3 rounded-lg border bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${color}`} />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        {trend}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold">{displayValue}</span>
      </div>
    </div>
  );
};

export default MetricCard;
