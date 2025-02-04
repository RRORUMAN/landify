import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/tools";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, DollarSign, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddTool = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subscriptionType: "",
    price: "",
    renewalDate: "",
    visitUrl: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to add tools.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("user_tools").insert({
        user_id: user.id,
        tool_id: formData.name, // Using name as ID for simplicity
        subscription_status: formData.subscriptionType,
        notes: formData.notes,
        subscription_details: {
          price: formData.price,
          renewal_date: formData.renewalDate,
          category: formData.category,
          description: formData.description,
          url: formData.visitUrl,
        },
      });

      if (error) throw error;

      toast({
        title: "Tool added successfully",
        description: "Your tool has been added to your collection.",
      });
      
      navigate("/tools/categories");
    } catch (error) {
      console.error("Error adding tool:", error);
      toast({
        title: "Error adding tool",
        description: "There was an error adding your tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add Your Tool</h1>
        <p className="text-gray-600 dark:text-gray-300">Track and manage your AI tool subscriptions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Tool Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter tool name"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Subscription Type
            </label>
            <select
              value={formData.subscriptionType}
              onChange={(e) => setFormData({ ...formData, subscriptionType: e.target.value })}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select subscription type</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
              <option value="lifetime">Lifetime</option>
              <option value="free">Free</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Monthly Cost
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Next Renewal Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <Input
                type="date"
                value={formData.renewalDate}
                onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
                className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Tool Website
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <Input
                type="url"
                value={formData.visitUrl}
                onChange={(e) => setFormData({ ...formData, visitUrl: e.target.value })}
                placeholder="https://example.com"
                className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Description & Notes
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Add any notes about how you use this tool..."
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Add Tool
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTool;