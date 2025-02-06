
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Users, Copy, CheckCircle2, Gift, Award } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Team, TeamInvite } from '@/data/types';
import { useState } from 'react';

const ReferralProgram = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

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
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: invite, error } = await supabase
        .from('team_invites')
        .insert({
          team_id: teamId,
          invited_by: user.id,
          uses_remaining: 5,
          role: 'member'
        })
        .select()
        .single();

      if (error) throw error;

      await refetchInvites();
      
      toast({
        title: "Success!",
        description: "New referral link has been created. Share it with your friends!",
      });

      return invite;
    } catch (error) {
      toast({
        title: "Error generating link",
        description: "There was an error creating the referral link.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyInviteLink = async (inviteCode: string) => {
    try {
      const inviteUrl = `${window.location.origin}/teams/join/${inviteCode}`;
      await navigator.clipboard.writeText(inviteUrl);
      
      toast({
        title: "Copied!",
        description: "Referral link has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error copying link",
        description: "There was an error copying the referral link.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Gift className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Referral Program
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Invite friends to join your teams and earn rewards
        </p>
      </div>

      {/* Rewards Section */}
      <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <Award className="h-12 w-12 text-blue-500" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Rewards Program
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Get 1 month free for every 3 friends who join</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Unlock premium features for your team</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Earn points for special rewards</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

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
                  disabled={isLoading}
                  className="ml-4"
                >
                  Generate New Link
                </Button>
              </div>

              <div className="space-y-3">
                {invites?.filter(invite => invite.team_id === team.id).map((invite) => (
                  <div
                    key={invite.id}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700"
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
                      <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
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
