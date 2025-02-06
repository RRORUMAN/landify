
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Users, Folder, Settings, Plus, BookOpen } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import type { Team, TeamMember, Tool, UserTool } from '@/data/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

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
      
      // Transform the data to match our types
      const transformedTeam = {
        ...team,
        team_members: team.team_members.map((member: any) => ({
          ...member,
          user: {
            email: member.profiles?.email
          }
        }))
      };

      return transformedTeam as Team & { team_members: (TeamMember & { user: { email: string } })[] };
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

      // Transform the data to match our types
      return tools.map(item => ({
        ...item.tools,
        folder_id: item.folder_id
      })) as (Tool & { folder_id: string })[];
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
      return logs;
    },
  });

  const isAdmin = teamData?.team_members.some(
    member => member.user_id === supabase.auth.getUser()?.data?.user?.id && member.role === 'admin'
  );

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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="tools">Shared Tools</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
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

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Recent Activity</h3>
              {activityLogs?.length === 0 ? (
                <p className="text-gray-500">No recent activity</p>
              ) : (
                <div className="space-y-4">
                  {activityLogs?.map((log) => (
                    <div key={log.id} className="flex items-center space-x-4">
                      <BookOpen className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">{log.activity_type}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(log.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
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
                        <div className="flex items-center space-x-2">
                          <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                            {member.role}
                          </Badge>
                          <p className="text-sm text-gray-500">
                            Joined {new Date(member.joined_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    {isAdmin && member.user_id !== supabase.auth.getUser().then(({ data }) => data?.user?.id) && (
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
              {!sharedTools?.length ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No tools have been shared with this team yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sharedTools?.map((tool) => (
                    <Card key={tool.id} className="p-4">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={tool.logo} 
                          alt={tool.name} 
                          className="w-12 h-12 rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-black dark:text-white">
                            {tool.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {tool.description}
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

        <TabsContent value="activity">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Activity Log</h3>
              {activityLogs?.length === 0 ? (
                <p className="text-gray-500">No activity recorded yet</p>
              ) : (
                <div className="space-y-4">
                  {activityLogs?.map((log) => (
                    <div key={log.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                          <BookOpen className="h-4 w-4 text-blue-500 dark:text-blue-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {log.activity_type}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(log.created_at).toLocaleString()}
                          </p>
                          {log.activity_data && (
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                              <pre className="whitespace-pre-wrap">
                                {JSON.stringify(log.activity_data, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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

