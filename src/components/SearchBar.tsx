import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        type="text"
        placeholder="Search AI tools by name, category, or task..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 py-6 text-lg rounded-xl shadow-sm border-gray-200 focus:border-purple-500 focus:ring-purple-500"
      />
    </div>
  );
};

export default SearchBar;