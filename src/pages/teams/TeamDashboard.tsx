
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Users, Folder, Settings } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import type { Team, TeamMember } from '@/data/types';
import type { TeamActivityLog as TeamActivityLogType } from '@/types/aiTypes';
import { Skeleton } from '@/components/ui/skeleton';
import TeamOverview from './components/TeamOverview';
import TeamMembersList from './components/TeamMembersList';
import TeamToolsGrid from './components/TeamToolsGrid';
import TeamActivityLogComponent from './components/TeamActivityLog';
import AIWorkflowInsights from './components/AIWorkflowInsights';

const TeamDashboard = () => {
  const { teamId } = useParams();

  const { data: teamData, isLoading: isLoadingTeam } = useQuery({
    queryKey: ['team', teamId],
    queryFn: async () => {
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select(`
          *,
          team_members (
            *,
            profiles:user_id (
              email
            )
          )
        `)
        .eq('id', teamId)
        .single();

      if (teamError) throw teamError;
      
      if (!team) throw new Error('Team not found');

      const teamWithMembers = {
        id: team.id,
        name: team.name,
        description: team.description,
        created_by: team.created_by,
        created_at: team.created_at,
        updated_at: team.updated_at,
        team_members: team.team_members.map((member: any) => ({
          id: member.id,
          team_id: member.team_id,
          user_id: member.user_id,
          role: member.role,
          joined_at: member.joined_at,
          user: {
            email: member.profiles?.email
          }
        }))
      };

      return teamWithMembers as Team & { team_members: (TeamMember & { user: { email: string } })[] };
    },
  });

  const { data: sharedTools, isLoading: isLoadingTools } = useQuery({
    queryKey: ['team-tools', teamId],
    queryFn: async () => {
      const { data: tools, error } = await supabase
        .from('folder_tools')
        .select(`
          *,
          tools:tool_id (*)
        `)
        .eq('folder_id', teamId);

      if (error) throw error;

      return tools.map(item => ({
        ...item.tools,
        folder_id: item.folder_id
      }));
    },
  });

  const { data: activityLogs, isLoading: isLoadingLogs } = useQuery({
    queryKey: ['team-activity', teamId],
    queryFn: async () => {
      const { data: logs, error } = await supabase
        .from('team_activity_logs')
        .select('*')
        .eq('team_id', teamId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      return logs.map(log => ({
        ...log,
        activity_data: log.activity_data as Record<string, any>
      })) as TeamActivityLogType[];
    },
  });

  const isAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return teamData?.team_members.some(member => 
      member.user_id === user?.id && member.role === 'admin'
    ) || false;
  };

  if (isLoadingTeam || isLoadingTools) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Team not found or you don't have access to it.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white mb-2">{teamData.name}</h1>
          <p className="text-gray-600 dark:text-gray-300">{teamData.description}</p>
        </div>
        {isAdmin && (
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Team Settings
          </Button>
        )}
      </div>

      <div className="mb-6">
        <AIWorkflowInsights teamId={teamId!} />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="tools">Shared Tools</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <TeamOverview 
            teamData={teamData} 
            sharedTools={sharedTools} 
            activityLogs={activityLogs} 
          />
        </TabsContent>

        <TabsContent value="members">
          <TeamMembersList 
            members={teamData.team_members} 
            isAdmin={isAdmin} 
          />
        </TabsContent>

        <TabsContent value="tools">
          <TeamToolsGrid tools={sharedTools} />
        </TabsContent>

        <TabsContent value="activity">
          <TeamActivityLogComponent logs={activityLogs} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamDashboard;
