
import { Tool } from "@/data/types";
import { Building2, Globe, Calendar, Puzzle } from "lucide-react";

interface CompanyInfoProps {
  tool: Tool;
}

const CompanyInfo = ({ tool }: CompanyInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Building2 className="h-4 w-4" />
        <span>{tool.company_name ?? 'N/A'}</span>
      </div>
      
      {tool.company_website && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Globe className="h-4 w-4" />
          <a 
            href={tool.company_website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Visit Website
          </a>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Calendar className="h-4 w-4" />
        <span>Founded: {tool.founding_year ?? 'N/A'}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Puzzle className="h-4 w-4" />
        <span>{tool.integration_count ?? 0} Integrations</span>
      </div>
    </div>
  );
};

export default CompanyInfo;
