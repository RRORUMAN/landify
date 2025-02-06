
import { motion, AnimatePresence } from "framer-motion";
import type { UserTool } from "@/data/types";
import ToolCard from "@/components/ToolCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryToolsProps {
  category: string;
  tools: UserTool[];
  viewMode?: 'grid' | 'list';
}

export const CategoryTools = ({ category, tools, viewMode = 'grid' }: CategoryToolsProps) => {
  const validTools = tools.filter(userTool => userTool.tool !== undefined);
  
  if (viewMode === 'list') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tool Name</TableHead>
            <TableHead>Monthly Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Next Billing</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {validTools.map((userTool) => (
            <TableRow key={userTool.id}>
              <TableCell className="font-medium">{userTool.tool?.name}</TableCell>
              <TableCell>${userTool.monthly_cost?.toFixed(2) || '0.00'}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  userTool.subscription_status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {userTool.subscription_status}
                </span>
              </TableCell>
              <TableCell>
                {userTool.next_billing_date 
                  ? format(new Date(userTool.next_billing_date), 'MMM dd, yyyy')
                  : 'N/A'}
              </TableCell>
              <TableCell>
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
