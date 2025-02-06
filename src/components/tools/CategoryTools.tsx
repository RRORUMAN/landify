
import { motion, AnimatePresence } from "framer-motion";
import type { UserTool } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Activity, DollarSign, X, Edit2, Save, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryToolsProps {
  category: string;
  tools: UserTool[];
  viewMode?: 'grid' | 'list';
  onRemoveTool?: (toolId: string) => void;
}

export const CategoryTools = ({ category, tools, viewMode = 'grid', onRemoveTool }: CategoryToolsProps) => {
  const validTools = tools.filter(userTool => userTool.tool !== undefined);
  const [editingTool, setEditingTool] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    monthly_cost: string;
    subscription_status: string;
  }>({ monthly_cost: '', subscription_status: '' });

  const handleEditStart = (tool: UserTool) => {
    setEditingTool(tool.tool_id);
    setEditForm({
      monthly_cost: tool.monthly_cost?.toString() || '0',
      subscription_status: tool.subscription_status || 'inactive'
    });
  };

  const handleEditCancel = () => {
    setEditingTool(null);
    setEditForm({ monthly_cost: '', subscription_status: '' });
  };

  const handleEditSave = async (toolId: string) => {
    try {
      const { error } = await supabase
        .from('user_tools')
        .update({
          monthly_cost: parseFloat(editForm.monthly_cost),
          subscription_status: editForm.subscription_status,
        })
        .eq('tool_id', toolId);

      if (error) throw error;

      toast({
        title: "Tool updated",
        description: "Your changes have been saved successfully",
      });
      setEditingTool(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveTool = async (toolId: string) => {
    try {
      const { error } = await supabase
        .from('user_tools')
        .delete()
        .eq('tool_id', toolId);

      if (error) throw error;

      onRemoveTool?.(toolId);
      toast({
        title: "Tool removed",
        description: "The tool has been removed from your list",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  const containerClassName = viewMode === 'grid' 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    : "space-y-4";

  return (
    <div className={containerClassName}>
      <AnimatePresence>
        {validTools.map((userTool) => (
          <motion.div
            key={userTool.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Card className={`${viewMode === 'list' ? 'flex items-center justify-between' : ''} p-6 bg-white hover:shadow-md transition-shadow`}>
              {editingTool === userTool.tool_id ? (
                <div className="space-y-4 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {userTool.tool?.name}
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditCancel()}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleEditSave(userTool.tool_id)}
                        className="bg-[#4361EE] hover:bg-[#3249d8] text-white"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Monthly Cost</label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                        <Input
                          type="number"
                          value={editForm.monthly_cost}
                          onChange={(e) => setEditForm(prev => ({ ...prev, monthly_cost: e.target.value }))}
                          className="pl-8"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-500">Status</label>
                      <Select
                        value={editForm.subscription_status}
                        onValueChange={(value) => setEditForm(prev => ({ ...prev, subscription_status: value }))}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`${viewMode === 'list' ? 'flex items-center justify-between w-full' : 'space-y-4'}`}>
                  <div className={viewMode === 'list' ? 'flex items-center gap-6 flex-1' : ''}>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {userTool.tool?.name}
                      </h3>
                      {viewMode === 'list' && (
                        <p className="text-sm text-gray-500">{userTool.tool?.category}</p>
                      )}
                    </div>

                    <div className={`flex ${viewMode === 'list' ? 'items-center gap-6' : 'items-center justify-between'}`}>
                      <div className="space-y-1">
                        <span className="text-sm text-gray-500">Monthly Cost</span>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                          <span className="text-xl font-semibold text-gray-900">
                            {userTool.monthly_cost?.toFixed(2) || '0.00'}
                          </span>
                        </div>
                      </div>

                      <Badge 
                        variant={userTool.subscription_status === 'active' ? 'default' : 'secondary'}
                        className={userTool.subscription_status === 'active' ? 
                          'bg-[#4361EE] hover:bg-[#3249d8] text-white border-none' : 
                          'bg-gray-100 text-gray-600'}
                      >
                        {userTool.subscription_status}
                      </Badge>
                    </div>
                  </div>

                  <div className={`flex items-center ${viewMode === 'list' ? 'gap-4' : 'justify-between mt-4'}`}>
                    <Button
                      variant="outline"
                      onClick={() => window.open(userTool.tool?.visit_url, '_blank')}
                      className="flex items-center justify-center gap-2 text-[#4361EE] hover:text-[#3249d8] bg-white hover:bg-gray-50 border-[#4361EE] hover:border-[#3249d8]"
                    >
                      Visit <ArrowUpRight className="w-4 h-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleEditStart(userTool)}
                        className="text-gray-400 hover:text-[#4361EE]"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleRemoveTool(userTool.tool_id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
