
import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface EmptyTeamStateProps {
  onCreateClick: () => void;
}

const EmptyTeamState = ({ onCreateClick }: EmptyTeamStateProps) => {
  return (
    <Card className="p-12 text-center">
      <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        No Teams Yet
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Create your first team to start collaborating with others.
      </p>
      <Button
        onClick={onCreateClick}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Plus className="h-5 w-5 mr-2" />
        Create Team
      </Button>
    </Card>
  );
};

export default EmptyTeamState;
