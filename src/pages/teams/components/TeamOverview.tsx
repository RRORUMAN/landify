
import { Users, Folder, Settings, BookOpen } from 'lucide-react';
import { Card } from "@/components/ui/card";
import type { Team, TeamMember, Tool, TeamActivityLog } from '@/data/types';

interface TeamOverviewProps {
  teamData: Team & { team_members: (TeamMember & { user: { email: string } })[] };
  sharedTools: (Tool & { folder_id: string })[] | undefined;
  activityLogs: TeamActivityLog[] | undefined;
}

const TeamOverview = ({ teamData, sharedTools, activityLogs }: TeamOverviewProps) => {
  return (
    <div className="space-y-6">
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
          {!activityLogs?.length ? (
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
    </div>
  );
};

export default TeamOverview;
