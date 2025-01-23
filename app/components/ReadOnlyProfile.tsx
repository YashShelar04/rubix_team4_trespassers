import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileProps {
  userData: {
    name?: string;
    email?: string;
    bio?: string;
    profilePicture?: string;
    skills?: string[];
    interests?: string[];
    projects?: {
      id: string;
      name: string;
      type: string;
      hackathon?: string;
      screenshots?: string[];
    }[];
  };
}

export default function ReadOnlyProfile({ userData = {} }: ProfileProps) {
  const {
    name = "N/A",
    email = "johndoe@gmail.com",
    bio = "No bio available.",
    profilePicture = "/default-profile.png",
    skills = [],
    interests = [],
    projects = [],
  } = userData;

  return (
    <div className="space-y-6 p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
        Profile Overview
      </h2>

      {/* Main Profile Card */}
      <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <Avatar className="w-24 h-24 border-2 border-cyan-400/20">
                <AvatarImage src={profilePicture} />
                <AvatarFallback className="bg-cyan-400/10 text-cyan-400 text-2xl">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-grow space-y-4">
              <div>
                <h3 className="text-2xl font-semibold text-white">{name}</h3>
                <p className="text-gray-400">{email}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Bio</h4>
                <p className="text-gray-300 text-sm">{bio}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-cyan-400">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-cyan-400/10 text-cyan-400 border-cyan-400">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-400">No skills available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-purple-400">Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {interests.length > 0 ? (
                interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="secondary"
                    className="bg-purple-400/10 text-purple-400 border-purple-400"
                  >
                    {interest}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-400">No interests available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-green-400">Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Card
                  key={project.id}
                  className="group relative bg-gray-800/50 border-none shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="aspect-video rounded-t-lg overflow-hidden">
                      <img
                        src={
                          project.screenshots && project.screenshots.length > 0
                            ? project.screenshots[0]
                            : "/placeholder.svg"
                        }
                        alt={project.name}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-200 text-lg">{project.name}</h4>
                      <p className="text-sm text-gray-400">{project.type}</p>
                      {project.hackathon && (
                        <Badge
                          variant="secondary"
                          className="mt-2 text-sm bg-purple-400/10 text-purple-400 border-purple-400"
                        >
                          {project.hackathon}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-400">No projects available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
