import { Button } from "@/components/ui/button";
import { categories } from "@/data/tools";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Categories</h2>
      <div className="space-y-2">
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          className={`w-full justify-start py-3 px-4 text-base font-medium ${
            selectedCategory === null 
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
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
              className={`w-full justify-start py-3 px-4 text-base font-medium ${
                selectedCategory === category.name
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => onSelectCategory(category.name)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;