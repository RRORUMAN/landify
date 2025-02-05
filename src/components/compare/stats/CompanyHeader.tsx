
import { Tool } from "@/data/types";

interface CompanyHeaderProps {
  tool: Tool;
}

const CompanyHeader = ({ tool }: CompanyHeaderProps) => {
  return (
    <div className="flex items-start gap-4">
      <img 
        src={tool.logo} 
        alt={tool.name} 
        className="w-16 h-16 rounded-lg object-contain bg-white border p-2" 
      />
      <div className="flex-1">
        <h3 className="font-semibold text-xl">{tool.name}</h3>
        <div className="flex items-center gap-1 text-sm text-amber-500">
          ★ {tool.rating}/5 ({tool.reviews.toLocaleString()} reviews)
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
