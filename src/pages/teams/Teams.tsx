
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Users, FolderPlus, Copy, Check, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Team, TeamInvite } from '@/data/types';

const Teams = () => {
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', description: '' });
  const [copiedInviteCode, setCopiedInviteCode] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: teams, isLoading, refetch } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      console.log('Fetching teams...');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: teamsData, error: teamsError } = await supabase
        .from('teams')
        .select(`
          *,
          team_members (
            id,
            role,
            user_id
          )
        `);

      if (teamsError) {
        console.error('Error fetching teams:', teamsError);
        throw teamsError;
      }
      return teamsData as Team[];
    }
  });

  const handleCreateTeam = async () => {
    if (!newTeam.name.trim()) {
      toast({
        title: 'Team name required',
        description: 'Please enter a name for your team.',
        variant: 'destructive',
      });
      return;
    }

    setIsCreating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Not authenticated');
      }

      console.log('Creating team...');
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert({
          name: newTeam.name,
          description: newTeam.description,
          created_by: user.id
        })
        .select()
        .single();

      if (teamError) {
        console.error('Error creating team:', teamError);
        throw teamError;
      }

      console.log('Team created, creating admin member record...');
      const { error: memberError } = await supabase
        .from('team_members')
        .insert({
          team_id: team.id,
          user_id: user.id,
          role: 'admin'
        });

      if (memberError) {
        console.error('Error creating team member:', memberError);
        throw memberError;
      }

      toast({
        title: 'Team created successfully',
        description: 'Your new team has been created.',
      });

      setIsCreateOpen(false);
      setNewTeam({ name: '', description: '' });
      refetch();
    } catch (error) {
      console.error('Team creation error:', error);
      toast({
        title: 'Error creating team',
        description: error instanceof Error ? error.message : 'There was an error creating your team. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

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
        // Create new invite if none exists
        const { data: newInvite, error: createError } = await supabase
          .from('team_invites')
          .insert({
            team_id: teamId,
            invited_by: (await supabase.auth.getUser()).data.user?.id,
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
      toast({
        title: 'Error copying invite link',
        description: 'There was an error generating the invite link.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teams</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Collaborate and share tools with your team members
          </p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-5 w-5 mr-2" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Team</DialogTitle>
              <DialogDescription>
                Create a team to collaborate and share tools with others.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Team Name</Label>
                <Input
                  id="name"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter team name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTeam.description}
                  onChange={(e) => setNewTeam(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your team's purpose"
                />
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleCreateTeam} 
                  className="w-full"
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Team'
                  )}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams?.map((team) => (
          <Card key={team.id} className="p-6 hover:shadow-lg transition-shadow">
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
        ))}
      </div>

      {teams?.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Teams Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Create your first team to start collaborating with others.
          </p>
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Team
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Teams;
