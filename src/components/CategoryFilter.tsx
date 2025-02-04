import { Button } from "@/components/ui/button";
import { categories } from "@/data/tools";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
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
  const [orderedCategories, setOrderedCategories] = useState(categories);

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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Categories</h2>
      <div className="space-y-4">
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          className={`w-full justify-start py-3 px-4 text-base font-medium ${
            selectedCategory === null 
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
          onClick={() => onSelectCategory(null)}
        >
          All Tools
        </Button>
        
        {orderedCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={category.name} className="flex items-center gap-2">
              <DragHandleDots2Icon className="h-5 w-5 text-gray-400 cursor-move" />
              <Button
                variant={selectedCategory === category.name ? "default" : "ghost"}
                className={`flex-1 justify-start py-3 px-4 text-base font-medium ${
                  selectedCategory === category.name
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={() => onSelectCategory(category.name)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {category.name}
              </Button>
            </div>
          );
        })}

        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Custom Tags</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {customTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
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