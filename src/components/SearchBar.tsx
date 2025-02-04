import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        placeholder="Search AI tools by name, description, or tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-12 py-6 text-base rounded-xl border-gray-200 focus:border-gray-300 focus:ring-gray-300 bg-white"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4 text-gray-400" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;