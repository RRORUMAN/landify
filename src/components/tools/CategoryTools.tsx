
import { motion, AnimatePresence } from "framer-motion";
import type { UserTool } from "@/data/types";
import ToolCard from "@/components/ToolCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ArrowUpRight, Activity, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CategoryToolsProps {
  category: string;
  tools: UserTool[];
  viewMode?: 'grid' | 'list';
}

export const CategoryTools = ({ category, tools, viewMode = 'grid' }: CategoryToolsProps) => {
  const validTools = tools.filter(userTool => userTool.tool !== undefined);
  
  if (viewMode === 'list') {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tool Name</TableHead>
              <TableHead>Monthly Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Next Billing</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {validTools.map((userTool) => (
              <TableRow key={userTool.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <img 
                      src={userTool.tool?.logo} 
                      alt={userTool.tool?.name} 
                      className="w-8 h-8 rounded-lg"
                    />
                    {userTool.tool?.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    ${userTool.monthly_cost?.toFixed(2) || '0.00'}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={userTool.subscription_status === 'active' ? 'default' : 'secondary'}>
                    {userTool.subscription_status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-500" />
                    High
                  </div>
                </TableCell>
                <TableCell>
                  {userTool.next_billing_date 
                    ? format(new Date(userTool.next_billing_date), 'MMM dd, yyyy')
                    : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(userTool.tool?.visit_url, '_blank')}
                    className="flex items-center gap-2"
                  >
                    Visit <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {validTools.map((userTool) => (
          <motion.div
            key={userTool.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {userTool.tool && (
              <ToolCard
                tool={{
                  ...userTool.tool,
                  monthly_cost: userTool.monthly_cost,
                  billing_cycle: userTool.billing_cycle,
                  next_billing_date: userTool.next_billing_date,
                  subscription_status: userTool.subscription_status,
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
