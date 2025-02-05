
import { Tool } from "@/data/types";
import { Building2, Globe, Calendar, Network } from "lucide-react";

interface CompanyInfoProps {
  tool: Tool;
}

const CompanyInfo = ({ tool }: CompanyInfoProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <Building2 className="h-4 w-4" />
        <span>{tool.company_name}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Calendar className="h-4 w-4" />
        <span>Founded: {tool.founding_year}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Network className="h-4 w-4" />
        <span>{tool.integration_count} Integrations</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Globe className="h-4 w-4" />
        <a href={tool.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default CompanyInfo;
