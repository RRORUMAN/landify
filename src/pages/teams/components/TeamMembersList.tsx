
import { Plus } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { TeamMember } from '@/data/types';
import { supabase } from "@/integrations/supabase/client";

interface TeamMembersListProps {
  members: (TeamMember & { user: { email: string } })[];
  isAdmin: boolean;
}

const TeamMembersList = ({ members, isAdmin }: TeamMembersListProps) => {
  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-black dark:text-white">Team Members</h3>
          {isAdmin && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          )}
        </div>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {member.user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-black dark:text-white">{member.user.email}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                      {member.role}
                    </Badge>
                    <p className="text-sm text-gray-500">
                      Joined {new Date(member.joined_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              {isAdmin && (
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TeamMembersList;
