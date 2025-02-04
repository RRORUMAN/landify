import { Button } from "@/components/ui/button";
import { categories } from "@/data/tools";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="sticky top-4 space-y-3 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-6">Categories</h2>
      <Button
        variant={selectedCategory === null ? "default" : "ghost"}
        className="w-full justify-start py-6 text-base"
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
            className={`w-full justify-start py-6 text-base ${
              selectedCategory === category.name ? "bg-primary hover:bg-primary/90" : ""
            }`}
            onClick={() => onSelectCategory(category.name)}
          >
            <Icon className="mr-2 h-5 w-5" />
            {category.name}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;