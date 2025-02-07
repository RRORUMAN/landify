
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, FolderPlus, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Team } from '@/data/types';

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [copiedInviteCode, setCopiedInviteCode] = useState<string | null>(null);

  const copyInviteCode = async (teamId: string) => {
    try {
      const { data: invite, error } = await supabase
        .from('team_invites')
        .select('invite_code')
        .eq('team_id', teamId)
        .is('used_at', null)
        .gt('expires_at', new Date().toISOString())
        .gt('uses_remaining', 0)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error || !invite) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          throw new Error('Not authenticated');
        }

        // Create new invite if none exists
        const { data: newInvite, error: createError } = await supabase
          .from('team_invites')
          .insert({
            team_id: teamId,
            invited_by: user.id,
            uses_remaining: 5
          })
          .select()
          .single();

        if (createError) throw createError;
        
        const inviteUrl = `${window.location.origin}/teams/join/${newInvite.invite_code}`;
        await navigator.clipboard.writeText(inviteUrl);
        setCopiedInviteCode(teamId);
        setTimeout(() => setCopiedInviteCode(null), 2000);
        
        toast({
          title: 'Invite link copied',
          description: 'New invite link has been copied to clipboard.',
        });
      } else {
        const inviteUrl = `${window.location.origin}/teams/join/${invite.invite_code}`;
        await navigator.clipboard.writeText(inviteUrl);
        setCopiedInviteCode(teamId);
        setTimeout(() => setCopiedInviteCode(null), 2000);
        
        toast({
          title: 'Invite link copied',
          description: 'Invite link has been copied to clipboard.',
        });
      }
    } catch (error) {
      console.error('Error copying invite link:', error);
      toast({
        title: 'Error copying invite link',
        description: 'There was an error generating the invite link.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {team.name}
          </h3>
          {team.description && (
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
              {team.description}
            </p>
          )}
        </div>
        <Users className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => copyInviteCode(team.id)}
        >
          {copiedInviteCode === team.id ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Invite Link
            </>
          )}
        </Button>
        <Link to={`/teams/${team.id}`}>
          <Button variant="secondary" size="sm" className="w-full">
            <Users className="h-4 w-4 mr-2" />
            View Team
          </Button>
        </Link>
        <Link to={`/teams/${team.id}/folders`}>
          <Button variant="secondary" size="sm" className="w-full">
            <FolderPlus className="h-4 w-4 mr-2" />
            View Folders
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default TeamCard;
