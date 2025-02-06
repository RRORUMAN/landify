
import { motion, AnimatePresence } from "framer-motion";
import type { UserTool } from "@/data/types";
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
                  {userTool.tool?.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">
                      ${userTool.monthly_cost?.toFixed(2) || '0.00'}
                    </span>
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
                    <span className="text-gray-900">High</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">
                    {userTool.next_billing_date 
                      ? format(new Date(userTool.next_billing_date), 'MMM dd, yyyy')
                      : 'N/A'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(userTool.tool?.visit_url, '_blank')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
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
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {userTool.tool?.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-sm text-gray-500">Monthly Cost</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span className="text-xl font-semibold text-gray-900">
                      {userTool.monthly_cost?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>
                <Badge variant={userTool.subscription_status === 'active' ? 'default' : 'secondary'}>
                  {userTool.subscription_status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Next Billing</span>
                  <span className="text-gray-900">
                    {userTool.next_billing_date 
                      ? format(new Date(userTool.next_billing_date), 'MMM dd, yyyy')
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Usage</span>
                  <span className="text-gray-900">High</span>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => window.open(userTool.tool?.visit_url, '_blank')}
                className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700"
              >
                Visit Tool <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
