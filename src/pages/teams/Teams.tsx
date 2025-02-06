
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Users, FolderPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Team } from '@/data/types';

const Teams = () => {
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', description: '' });

  const { data: teams, isLoading, refetch } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Team[];
    }
  });

  const handleCreateTeam = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('teams')
        .insert({
          name: newTeam.name,
          description: newTeam.description,
          created_by: user.id
        });

      if (error) throw error;

      toast({
        title: 'Team created successfully',
        description: 'Your new team has been created.',
      });

      setIsCreateOpen(false);
      setNewTeam({ name: '', description: '' });
      refetch();
    } catch (error) {
      toast({
        title: 'Error creating team',
        description: 'There was an error creating your team. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading teams...</div>;
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
              <Button onClick={handleCreateTeam} className="w-full">
                Create Team
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams?.map((team) => (
          <Link key={team.id} to={`/teams/${team.id}`}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
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
              <div className="mt-4 flex items-center gap-4">
                <Button variant="secondary" size="sm" className="w-full">
                  <FolderPlus className="h-4 w-4 mr-2" />
                  View Folders
                </Button>
              </div>
            </Card>
          </Link>
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
