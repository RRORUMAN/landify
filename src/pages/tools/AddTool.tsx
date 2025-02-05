
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/tools";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, DollarSign, Link, Trash2, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserTool {
  id: string;
  tool_id: string;
  subscription_status: string;
  subscription_details: {
    price: string;
    renewal_date: string;
    category: string;
    description: string;
    url: string;
  };
  notes: string;
}

const AddTool = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userTools, setUserTools] = useState<UserTool[]>([]);
  const [totalSpend, setTotalSpend] = useState(0);
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

  useEffect(() => {
    fetchUserTools();
  }, []);

  const fetchUserTools = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: tools, error } = await supabase
        .from("user_tools")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      const typedTools: UserTool[] = tools.map(tool => ({
        ...tool,
        subscription_details: tool.subscription_details as UserTool['subscription_details']
      }));

      setUserTools(typedTools);
      
      const monthlyTotal = typedTools.reduce((acc, tool) => {
        const price = parseFloat(tool.subscription_details.price || "0");
        return acc + price;
      }, 0);
      
      setTotalSpend(monthlyTotal);
    } catch (error) {
      console.error("Error fetching tools:", error);
      toast({
        title: "Error fetching tools",
        description: "There was an error loading your tools.",
        variant: "destructive",
      });
    }
  };

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
        tool_id: formData.name,
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
      
      setFormData({
        name: "",
        description: "",
        category: "",
        subscriptionType: "",
        price: "",
        renewalDate: "",
        visitUrl: "",
        notes: "",
      });
      
      fetchUserTools();
    } catch (error) {
      console.error("Error adding tool:", error);
      toast({
        title: "Error adding tool",
        description: "There was an error adding your tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (toolId: string) => {
    try {
      const { error } = await supabase
        .from("user_tools")
        .delete()
        .eq("id", toolId);

      if (error) throw error;

      toast({
        title: "Tool removed",
        description: "The tool has been removed from your collection.",
      });

      fetchUserTools();
    } catch (error) {
      console.error("Error deleting tool:", error);
      toast({
        title: "Error removing tool",
        description: "There was an error removing the tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your Tool</h1>
        <p className="text-gray-600">Track and manage your AI tool subscriptions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-white border border-gray-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tool Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter tool name"
                  className="border-gray-200"
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
                  className="w-full rounded-md border border-gray-200 px-3 py-2 bg-white"
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
                  Subscription Type
                </label>
                <select
                  value={formData.subscriptionType}
                  onChange={(e) => setFormData({ ...formData, subscriptionType: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 bg-white"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Cost
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="pl-10 border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next Renewal Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    value={formData.renewalDate}
                    onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
                    className="pl-10 border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tool Website
                </label>
                <div className="relative">
                  <Link className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="url"
                    value={formData.visitUrl}
                    onChange={(e) => setFormData({ ...formData, visitUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="pl-10 border-gray-200"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description & Notes
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add any notes about how you use this tool..."
                className="border-gray-200"
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Tool
              </Button>
            </div>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 bg-white border border-gray-100 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Tools</h2>
            <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-blue-600">Total Monthly Spend</p>
                <p className="text-2xl font-bold text-blue-700">${totalSpend.toFixed(2)}</p>
              </div>
              <Button
                onClick={() => navigate("/tools/analytics")}
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                View Analytics
              </Button>
            </div>
            
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {userTools.map((tool) => (
                  <Card key={tool.id} className="p-4 bg-white border border-gray-100 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {tool.tool_id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {tool.subscription_details.category}
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm">
                            <span className="text-gray-600">Price:</span>{" "}
                            <span className="font-medium text-gray-900">
                              ${tool.subscription_details.price}/month
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="text-gray-600">Renewal:</span>{" "}
                            <span className="font-medium text-gray-900">
                              {new Date(tool.subscription_details.renewal_date).toLocaleDateString()}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="text-gray-600">Status:</span>{" "}
                            <span className="font-medium text-gray-900">
                              {tool.subscription_status}
                            </span>
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(tool.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-none">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-900">Pro Tip</h3>
                <p className="text-sm text-blue-600 mt-1">
                  Keep track of your subscription renewals to optimize your tool spending. Set up notifications to never miss a renewal date.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddTool;

