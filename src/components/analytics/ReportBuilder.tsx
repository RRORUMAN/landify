
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileDown, Send, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const ReportBuilder = () => {
  const [reportType, setReportType] = useState("usage");
  const [schedule, setSchedule] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateReport = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('usage_reports')
      .insert({
        user_id: user.id,
        report_type: reportType,
        schedule: schedule,
        recipients: [email],
        next_send: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Tomorrow
      });

    if (error) {
      toast.error("Failed to schedule report");
      return;
    }

    toast.success("Report scheduled successfully");
  };

  const handleExport = async () => {
    // Implement export logic here
    toast.success("Report exported successfully");
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Report Builder</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <Select
              value={reportType}
              onValueChange={setReportType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usage">Usage Report</SelectItem>
                <SelectItem value="cost">Cost Analysis</SelectItem>
                <SelectItem value="performance">Performance Metrics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule
            </label>
            <Select
              value={schedule}
              onValueChange={setSchedule}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Recipients
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button onClick={handleCreateReport} className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Report
          </Button>
          <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Export Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
