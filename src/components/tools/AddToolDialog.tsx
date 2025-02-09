
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolDetailsForm } from "@/components/tools/ToolDetailsForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { UserTool } from "@/data/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRICING_OPTIONS, BILLING_CYCLES } from "./AddToolTypes";
import { categories } from "@/data/tools";
import { Loader2 } from "lucide-react";

interface AddToolDialogProps {
  onAdd: (tool: UserTool) => void;
  onClose: () => void;
}

export const AddToolDialog = ({ onAdd, onClose }: AddToolDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    visitUrl: "",
    notes: "",
    price: "",
    billingCycle: "monthly",
    pricing: "Paid",
  });

  const handleExistingToolSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("tools")
        .select("*")
        .ilike("name", `%${query}%`)
        .limit(5);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error("Error searching tools:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to search tools. Please try again.",
      });
    }
  };

  const handleCustomToolSubmit = async () => {
    if (!formData.name || !formData.category || !formData.visitUrl) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // First create the custom tool
      const { data: toolData, error: toolError } = await supabase
        .from("tools")
        .insert({
          id: crypto.randomUUID(),
          name: formData.name,
          description: formData.description,
          category: formData.category,
          visit_url: formData.visitUrl,
          pricing: formData.pricing,
          is_custom: true,
          owner_id: user.id,
          logo: "https://placehold.co/60x60",
          rating: 0,
          reviews: 0,
          tags: [],
          bookmarks: 0,
          featured: false
        })
        .select()
        .single();

      if (toolError) throw toolError;

      // Then create the user_tool association
      const { data: userToolData, error: userToolError } = await supabase
        .from("user_tools")
        .insert({
          user_id: user.id,
          tool_id: toolData.id,
          monthly_cost: parseFloat(formData.price) || 0,
          billing_cycle: formData.billingCycle,
          notes: formData.notes,
          subscription_status: "active"
        })
        .select(`
          *,
          tool:tools(*)
        `)
        .single();

      if (userToolError) throw userToolError;

      onAdd(userToolData);
      toast({
        title: "Success",
        description: "Custom tool added successfully",
      });
      onClose();
    } catch (error) {
      console.error("Error adding custom tool:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add custom tool. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExistingToolSubmit = async () => {
    if (!selectedTool) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a tool first",
      });
      return;
    }

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Check if user already has this tool
      const { data: existingTool } = await supabase
        .from("user_tools")
        .select()
        .eq("user_id", user.id)
        .eq("tool_id", selectedTool.id)
        .maybeSingle();

      if (existingTool) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You already have this tool in your collection",
        });
        return;
      }

      const { data: userToolData, error: userToolError } = await supabase
        .from("user_tools")
        .insert({
          user_id: user.id,
          tool_id: selectedTool.id,
          monthly_cost: parseFloat(formData.price) || 0,
          billing_cycle: formData.billingCycle,
          notes: formData.notes,
          subscription_status: "active"
        })
        .select(`
          *,
          tool:tools(*)
        `)
        .single();

      if (userToolError) throw userToolError;

      onAdd(userToolData);
      toast({
        title: "Success",
        description: "Tool added successfully",
      });
      onClose();
    } catch (error) {
      console.error("Error adding existing tool:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add tool. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs defaultValue="existing" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="existing">Select Existing Tool</TabsTrigger>
        <TabsTrigger value="custom">Add Custom Tool</TabsTrigger>
      </TabsList>

      <TabsContent value="existing" className="mt-4">
        <div className="space-y-4">
          <Input
            placeholder="Search for tools..."
            value={searchQuery}
            onChange={(e) => handleExistingToolSearch(e.target.value)}
          />
          
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {searchResults.map((tool) => (
              <div
                key={tool.id}
                className={`flex items-center space-x-4 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedTool?.id === tool.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
                onClick={() => setSelectedTool(tool)}
              >
                <img src={tool.logo} alt={tool.name} className="w-8 h-8 rounded" />
                <div>
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-sm text-gray-500">{tool.category}</p>
                </div>
              </div>
            ))}
            {searchQuery.length >= 2 && searchResults.length === 0 && (
              <p className="text-gray-500 text-center py-4">No tools found</p>
            )}
          </ScrollArea>

          {selectedTool && (
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Monthly Cost
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Billing Cycle
                </label>
                <Select
                  value={formData.billingCycle}
                  onValueChange={(value) => setFormData({ ...formData, billingCycle: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select billing cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    {BILLING_CYCLES.map((cycle) => (
                      <SelectItem key={cycle} value={cycle}>
                        {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Notes (Optional)
                </label>
                <Input
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any notes about how you use this tool..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleExistingToolSubmit}
                  disabled={loading}
                  className="bg-[#4361EE] hover:bg-[#3249d8] text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Tool"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="custom" className="mt-4">
        <ToolDetailsForm formData={formData} setFormData={setFormData} />
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleCustomToolSubmit}
            disabled={loading}
            className="bg-[#4361EE] hover:bg-[#3249d8] text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Custom Tool"
            )}
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};
