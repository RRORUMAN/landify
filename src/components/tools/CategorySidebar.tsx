
import { Button } from "@/components/ui/button";
import {
  Search,
  Star,
  Code,
  PenTool,
  MonitorSmartphone,
  Paintbrush,
  Brain,
  BarChart3,
  Database,
  ClipboardList,
  MessageSquare,
  VideoIcon,
  GraduationCap,
  Heart,
  DollarSign,
  Palette,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface CategoryType {
  name: string;
  icon: any;
}

const categories: CategoryType[] = [
  { name: "Content Creation", icon: PenTool },
  { name: "Development", icon: Code },
  { name: "Design", icon: Paintbrush },
  { name: "Business Intelligence", icon: Brain },
  { name: "Sales & Marketing", icon: Star },
  { name: "Data Management", icon: Database },
  { name: "Project Management", icon: ClipboardList },
  { name: "Technology & IT", icon: MonitorSmartphone },
  { name: "Communication", icon: MessageSquare },
  { name: "Media Production", icon: VideoIcon },
  { name: "Analytics", icon: BarChart3 },
  { name: "Education & Learning", icon: GraduationCap },
  { name: "Healthcare & Wellness", icon: Heart },
  { name: "Financial Management", icon: DollarSign },
  { name: "Creative & Design", icon: Palette },
];

interface CategorySidebarProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categoryCount: Record<string, number>;
  totalTools: number;
}

const CategorySidebar = ({
  selectedCategory,
  setSelectedCategory,
  categoryCount,
  totalTools,
}: CategorySidebarProps) => {
  return (
    <div className="backdrop-blur-md bg-white/70 rounded-xl p-6 shadow-lg border border-white/20 sticky top-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Categories</h2>
      <div className="space-y-1 max-h-[600px] overflow-y-auto">
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          className={`w-full justify-start text-sm transition-all duration-200 ${
            selectedCategory === null 
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All Tools ({totalTools})
        </Button>
        
        {categories.map((category) => {
          const Icon = category.icon;
          const count = categoryCount[category.name] || 0;
          return (
            <Tooltip key={category.name}>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedCategory === category.name ? "default" : "ghost"}
                  className={`w-full justify-start text-sm transition-all duration-200 ${
                    selectedCategory === category.name
                      ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span className="flex-1 text-left">{category.name}</span>
                  <span className="text-xs text-gray-400">({count})</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View {category.name} tools ({count} tools)</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySidebar;
