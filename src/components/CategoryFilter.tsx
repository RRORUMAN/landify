import { Button } from "@/components/ui/button";
import { categories } from "@/data/tools";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="sticky top-4 space-y-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-6">Categories</h2>
      <Button
        variant={selectedCategory === null ? "default" : "ghost"}
        className="w-full justify-start mb-2"
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
            className={`w-full justify-start ${
              selectedCategory === category.name
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                : ""
            }`}
            onClick={() => onSelectCategory(category.name)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {category.name}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;