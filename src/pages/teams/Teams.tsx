
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Team } from '@/data/types';
import CreateTeamDialog from './components/CreateTeamDialog';
import TeamCard from './components/TeamCard';
import EmptyTeamState from './components/EmptyTeamState';

const Teams = () => {
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data: teams, isLoading, refetch } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      console.log('Fetching teams...');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        throw new Error('Not authenticated');
      }

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

      console.log('Teams data:', teamsData);
      return teamsData as Team[];
    }
  });

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
        <CreateTeamDialog onTeamCreated={refetch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams?.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>

      {teams?.length === 0 && (
        <EmptyTeamState onCreateClick={() => setIsCreateOpen(true)} />
      )}
    </div>
  );
};

export default Teams;
