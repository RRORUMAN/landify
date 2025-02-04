import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/tools";
import { useToast } from "@/hooks/use-toast";

const AddTool = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    pricing: "",
    visitUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement tool submission logic
    toast({
      title: "Tool submitted",
      description: "Your tool has been submitted for review.",
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Tool</h1>
        <p className="text-gray-600">Submit a new AI tool to our directory</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tool Name
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter tool name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the tool and its features"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pricing
          </label>
          <select
            value={formData.pricing}
            onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="">Select pricing type</option>
            <option value="Free Trial">Free Trial</option>
            <option value="Freemium">Freemium</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website URL
          </label>
          <Input
            type="url"
            value={formData.visitUrl}
            onChange={(e) => setFormData({ ...formData, visitUrl: e.target.value })}
            placeholder="https://example.com"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700"
        >
          Submit Tool
        </Button>
      </form>
    </div>
  );
};

export default AddTool;