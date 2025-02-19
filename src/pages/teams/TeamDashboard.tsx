
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tool, Team, TeamActivityLog as DataTeamActivityLog } from "@/data/types";
import { TeamActivityLog as AITeamActivityLog } from "@/types/aiTypes";
import TeamOverview from "./components/TeamOverview";
import TeamActivityLog from "./components/TeamActivityLog";
import AIWorkflowInsights from "./components/AIWorkflowInsights";

interface TeamData extends Team {
  team_members: {
    user: {
      email: string;
    };
  }[];
}

const TeamDashboard = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [selectedTab, setSelectedTab] = useState<"overview" | "tools" | "activity">("overview");

  // Fetch team data
  const { data: teamData } = useQuery({
    queryKey: ['team', teamId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select(`
          *,
          team_members (
            user (
              email
            )
          )
        `)
        .eq('id', teamId)
        .single();

      if (error) throw error;
      return data as TeamData;
    }
  });

  // Fetch shared tools
  const { data: sharedTools } = useQuery({
    queryKey: ['shared_tools', teamId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shared_tools')
        .select(`
          *,
          tool:tools (*)
        `)
        .eq('team_id', teamId);

      if (error) throw error;
      return data.map(item => ({
        ...item.tool,
        folder_id: item.folder_id
      })) as (Tool & { folder_id: string })[];
    }
  });

  // Fetch activity logs
  const { data: activityLogs } = useQuery({
    queryKey: ['activity_logs', teamId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_activity_logs')
        .select('*')
        .eq('team_id', teamId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data.map(log => ({
        ...log,
        timestamp: log.created_at // Map created_at to timestamp for compatibility
      })) as unknown as DataTeamActivityLog[];
    }
  });

  if (!teamData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <TeamOverview 
          teamData={teamData}
          sharedTools={sharedTools}
          activityLogs={activityLogs as DataTeamActivityLog[]}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TeamActivityLog 
            logs={activityLogs as DataTeamActivityLog[]}
          />
          <AIWorkflowInsights teamId={teamId || ''} />
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;
