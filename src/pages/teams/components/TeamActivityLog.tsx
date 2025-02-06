
import { BookOpen } from 'lucide-react';
import { Card } from "@/components/ui/card";
import type { TeamActivityLog as TeamActivityLogType } from '@/data/types';

interface TeamActivityLogProps {
  logs: TeamActivityLogType[] | undefined;
}

const TeamActivityLog = ({ logs }: TeamActivityLogProps) => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Activity Log</h3>
        {!logs?.length ? (
          <p className="text-gray-500">No activity recorded yet</p>
        ) : (
          <div className="space-y-4">
            {logs?.map((log) => (
              <div key={log.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <BookOpen className="h-4 w-4 text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {log.activity_type}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(log.created_at).toLocaleString()}
                    </p>
                    {log.activity_data && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(log.activity_data, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default TeamActivityLog;
