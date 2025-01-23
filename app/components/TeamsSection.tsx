import React, { useState } from "react";
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateTeamModal } from "./CreateTeamModal";
import Link from "next/link";

interface Team {
  id: number;
  name: string;
  avatar?: string;
  status: string;
  members: Array<{ id: number; name: string }>;
}

interface UserData {
  teams?: Team[];
}

interface TeamsSectionProps {
  userData: UserData;
}

const mockUser = {
  id: 1,
  name: "John Doe",
  isTeamLeader: false,
  team: null,
  skills: ["React", "Node.js", "MongoDB", "Python"],
};

export const TeamsSection: React.FC<TeamsSectionProps> = ({ userData }) => {
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [user, setUser] = useState(mockUser);
  const [teams, setTeams] = useState<Team[]>(userData.teams || []);

  // Handler for creating a new team
  const handleCreateTeam = (newTeam: any) => {
    const createdTeam = {
      id: Date.now(),
      name: newTeam.name,
      status: "Active",
      members: [{ id: user.id, name: user.name }],
      avatar: newTeam.avatar || "/placeholder.svg"
    };
    
    setTeams(prevTeams => [...prevTeams, createdTeam]);
    setUser({
      ...user,
      isTeamLeader: true,
      team: { ...createdTeam, vacancies: 3 },
    });
    setIsCreateTeamOpen(false);
  };

  // Handler for leaving a team
  const handleLeaveTeam = (teamId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
  };

  // Handler for joining a call
  const handleJoinCall = (teamId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    console.log("Joining call for team:", teamId);
    // Add your call joining logic here
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {teams.map((team) => (
          <Card
            key={team.id}
            className="group relative bg-gray-800/50 border-none shadow-xl backdrop-blur-sm hover:shadow-2xl hover:bg-gray-800/70 transition-all duration-300"
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12 border-2 border-green-400/20">
                  <AvatarImage src={team.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-green-400/10 text-green-400">
                    {team.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Link href="/upload-page">
                    <h4 className="font-medium text-gray-200 text-lg cursor-pointer">
                      {team.name}
                    </h4>
                  </Link>
                  <p className="text-sm text-gray-400">
                    {team.members.length} members
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="secondary"
                  className="bg-green-400/10 text-green-400 border-green-400 hover:bg-green-400/20 transition-colors duration-300"
                >
                  {team.status}
                </Badge>
                <Link href="/video">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={(e) => handleJoinCall(team.id, e)}
                >
                  Join Call
                </Button>
                </Link>
                
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={(e) => handleLeaveTeam(team.id, e)}
                >
                  Leave
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {teams.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No teams found. Join or create a team to get started!
          </div>
        )}
        <Button
          onClick={() => setIsCreateTeamOpen(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/20 rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200"
        >
          <Users className="h-5 w-5 mr-2" /> Create Team
        </Button>
        {user.isTeamLeader && user.team && user.team.vacancies > 0 && (
          <Link href="/find-members">
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/20 rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200">
              <Users className="h-5 w-5 mr-2" /> Find Team Members
            </Button>
          </Link>
        )}
        <CreateTeamModal
          isOpen={isCreateTeamOpen}
          onClose={() => setIsCreateTeamOpen(false)}
          onCreateTeam={handleCreateTeam}
        />
      </div>
    </div>
  );
};