
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Users, Folder, Settings, Plus } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import type { Team, TeamMember, Tool, UserTool } from '@/data/types';
import { Skeleton } from '@/components/ui/skeleton';

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
            user:user_id (
              email
            )
          )
        `)
        .eq('id', teamId)
        .single();

      if (teamError) throw teamError;
      return team as Team & { team_members: (TeamMember & { user: { email: string } })[] };
    },
  });

  const { data: sharedTools, isLoading: isLoadingTools } = useQuery({
    queryKey: ['team-tools', teamId],
    queryFn: async () => {
      const { data: tools, error } = await supabase
        .from('folder_tools')
        .select(`
          *,
          tool:tool_id (*)
        `)
        .eq('folder_id', teamId);

      if (error) throw error;
      return tools as (Tool & { folder_id: string })[];
    },
  });

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

  const isAdmin = teamData.team_members.some(
    member => member.user_id === (supabase.auth.getUser()?.data?.user?.id) && member.role === 'admin'
  );

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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="tools">Shared Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-black dark:text-white">Members</h3>
              </div>
              <p className="mt-2 text-2xl font-bold text-black dark:text-white">
                {teamData.team_members.length}
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-2">
                <Folder className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold text-black dark:text-white">Folders</h3>
              </div>
              <p className="mt-2 text-2xl font-bold text-black dark:text-white">
                {/* Will implement folder count later */}
                0
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-semibold text-black dark:text-white">Tools</h3>
              </div>
              <p className="mt-2 text-2xl font-bold text-black dark:text-white">
                {sharedTools?.length || 0}
              </p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-black dark:text-white">Team Members</h3>
                {isAdmin && (
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {teamData.team_members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {member.user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-black dark:text-white">{member.user.email}</p>
                        <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                      </div>
                    </div>
                    {isAdmin && member.user_id !== supabase.auth.getUser()?.data?.user?.id && (
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-black dark:text-white">Shared Tools</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tool
                </Button>
              </div>
              {sharedTools?.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No tools have been shared with this team yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sharedTools?.map((toolData) => (
                    <Card key={toolData.id} className="p-4">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={toolData.tool?.logo} 
                          alt={toolData.tool?.name} 
                          className="w-12 h-12 rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-black dark:text-white">
                            {toolData.tool?.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {toolData.tool?.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamDashboard;
