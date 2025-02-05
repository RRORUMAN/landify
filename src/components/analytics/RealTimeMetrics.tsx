
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Gauge, Users, Zap, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const RealTimeMetrics = () => {
  const [activeSessions, setActiveSessions] = useState<number>(0);

  const { data: integrationHealth = [] } = useQuery({
    queryKey: ['integration_health'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('integration_health')
        .select('*')
        .order('last_check', { ascending: false });

      if (error) throw error;
      return data;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  useEffect(() => {
    // Subscribe to real-time active sessions updates
    const channel = supabase
      .channel('active-sessions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'active_sessions' },
        (payload) => {
          // Update active sessions count based on payload
          if (payload.eventType === 'INSERT') {
            setActiveSessions(prev => prev + 1);
          } else if (payload.eventType === 'DELETE') {
            setActiveSessions(prev => Math.max(0, prev - 1));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const healthyIntegrations = integrationHealth.filter(h => h.status === 'healthy').length;
  const totalIntegrations = integrationHealth.length;
  const averageResponseTime = integrationHealth.reduce((acc, curr) => acc + (curr.response_time || 0), 0) / totalIntegrations || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Sessions</p>
            <p className="text-2xl font-semibold">{activeSessions}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Response Time</p>
            <p className="text-2xl font-semibold">{averageResponseTime.toFixed(0)}ms</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Gauge className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Integration Health</p>
            <p className="text-2xl font-semibold">{healthyIntegrations}/{totalIntegrations}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Activity className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">System Status</p>
            <p className="text-2xl font-semibold text-green-600">Healthy</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
