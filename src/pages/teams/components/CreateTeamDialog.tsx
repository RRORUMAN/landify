
import { useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CreateTeamDialogProps {
  onTeamCreated: () => void;
}

const CreateTeamDialog = ({ onTeamCreated }: CreateTeamDialogProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', description: '' });
  const [isCreating, setIsCreating] = useState(false);

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
        navigate('/auth');
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

      setIsOpen(false);
      setNewTeam({ name: '', description: '' });
      onTeamCreated();
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
  );
};

export default CreateTeamDialog;
