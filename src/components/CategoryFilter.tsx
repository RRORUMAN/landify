
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag && !customTags.includes(newTag)) {
      setCustomTags([...customTags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setCustomTags(customTags.filter(t => t !== tag));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      <div className="space-y-2">
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          className={`w-full justify-start text-sm ${
            selectedCategory === null 
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => onSelectCategory(null)}
        >
          All Tools
        </Button>
        
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "ghost"}
              className={`w-full justify-start text-sm ${
                selectedCategory === category.name
                  ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => onSelectCategory(category.name)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Custom Tags</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {customTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add custom tag"
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Button size="icon" onClick={handleAddTag}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
