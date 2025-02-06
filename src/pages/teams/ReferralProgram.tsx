
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Users, Copy, CheckCircle2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Team, TeamInvite } from '@/data/types';

const ReferralProgram = () => {
  const { toast } = useToast();

  const { data: teams } = useQuery({
    queryKey: ['user-teams'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: teams, error } = await supabase
        .from('teams')
        .select('*, team_members(*)')
        .eq('team_members.user_id', user.id)
        .eq('team_members.role', 'admin');

      if (error) throw error;
      return teams as Team[];
    },
  });

  const { data: invites, refetch: refetchInvites } = useQuery({
    queryKey: ['team-invites'],
    queryFn: async () => {
      const { data: invites, error } = await supabase
        .from('team_invites')
        .select('*')
        .is('used_at', null)
        .gt('uses_remaining', 0)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return invites as TeamInvite[];
    },
  });

  const generateInviteLink = async (teamId: string) => {
    try {
      const { data: invite, error } = await supabase
        .from('team_invites')
        .insert({
          team_id: teamId,
          uses_remaining: 5,
          role: 'member'
        })
        .select()
        .single();

      if (error) throw error;

      await refetchInvites();
      
      toast({
        title: "Invite link generated",
        description: "New invite link has been created successfully.",
      });

      return invite;
    } catch (error) {
      toast({
        title: "Error generating invite",
        description: "There was an error creating the invite link.",
        variant: "destructive",
      });
    }
  };

  const copyInviteLink = async (inviteCode: string) => {
    try {
      const inviteUrl = `${window.location.origin}/teams/join/${inviteCode}`;
      await navigator.clipboard.writeText(inviteUrl);
      
      toast({
        title: "Link copied",
        description: "Invite link has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error copying link",
        description: "There was an error copying the invite link.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Referral Program
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Invite members to your teams and track referrals
        </p>
      </div>

      {teams?.length === 0 ? (
        <Card className="p-6 text-center">
          <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Teams Available
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Create a team first to start inviting members
          </p>
          <Link to="/teams">
            <Button>Create Team</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-6">
          {teams?.map((team) => (
            <Card key={team.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {team.name}
                  </h3>
                  {team.description && (
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {team.description}
                    </p>
                  )}
                </div>
                <Button
                  onClick={() => generateInviteLink(team.id)}
                  className="ml-4"
                >
                  Generate New Link
                </Button>
              </div>

              <div className="space-y-3">
                {invites?.filter(invite => invite.team_id === team.id).map((invite) => (
                  <div
                    key={invite.id}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Input
                          value={`${window.location.origin}/teams/join/${invite.invite_code}`}
                          readOnly
                          className="bg-transparent"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyInviteLink(invite.invite_code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span>Uses remaining: {invite.uses_remaining}</span>
                        <span className="mx-2">•</span>
                        <span>
                          Expires: {new Date(invite.expires_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReferralProgram;
