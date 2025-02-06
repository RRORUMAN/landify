
import { useParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";

const TeamFolders = () => {
  const { teamId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Team Folders</h1>
      <Card className="p-6">
        <p className="text-black dark:text-white">Team ID: {teamId}</p>
      </Card>
    </div>
  );
};

export default TeamFolders;
