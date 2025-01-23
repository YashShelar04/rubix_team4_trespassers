"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import ReadOnlyProfile from "@/app/components/ReadOnlyProfile"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for demonstration
const mockTeam = {
  id: "1bdskdjjkff",
  name: "Team Alpha",
  description: "A team focused on developing cutting-edge web applications",
  domainPreferences: ["Web Development", "Mobile Development", "AI/ML"],
  requiredSkills: ["React", "Node.js", "MongoDB", "TypeScript", "GraphQL"],
  members: [
    { id: "1", name: "John Doe", role: "Team Leader", skills: ["React", "Node.js", "MongoDB"] },
    { id: "2", name: "Jane Smith", role: "Developer", skills: ["React", "TypeScript", "GraphQL"] },
    { id: "3", name: "Mike Johnson", role: "Developer", skills: ["Node.js", "MongoDB", "Express"] },
  ],
  vacancies: 2,
}

export default function TeamDetailsPage({ params }: { params: { id: string } }) {
  const [team, setTeam] = useState(mockTeam)
  const [userSkills, setUserSkills] = useState(["React", "Node.js", "MongoDB", "Python"])
  const [selectedMember, setSelectedMember] = useState(null)
  const router = useRouter()// Unwrap the promise

  
  const matchingSkills = team.requiredSkills.filter((skill) => userSkills.includes(skill))
  const matchPercentage = (matchingSkills.length / team.requiredSkills.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm mb-8">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            {team.name}
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">{team.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Domain Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {team.domainPreferences.map((domain, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-500/20 text-blue-300 border-blue-500 text-sm"
                  >
                    {domain}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {team.requiredSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`${
                      userSkills.includes(skill)
                        ? "bg-green-500/20 text-green-300 border-green-500"
                        : "bg-gray-700 text-gray-300 border-gray-600"
                    } text-sm`}
                  >
                    {skill}
                    {userSkills.includes(skill) && <span className="ml-1 text-xs">✓</span>}
                  </Badge>
                ))}
                <p className="text-gray-300 text-lg">
            You match {matchingSkills.length} out of {team.requiredSkills.length} required skills (
            {matchPercentage.toFixed(0)}%)
          </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-cyan-400">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {team.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <Avatar className="w-16 h-16">
                  <AvatarImage src={`/avatars/${member.id}.png`} />
                  <AvatarFallback className="text-lg">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="text-lg font-medium text-cyan-400 hover:underline focus:outline-none"
                  >
                    {member.name}
                  </button>
                  <p className="text-sm text-gray-400">
                    {member.role} {member.role === "Team Leader" && "(Team Leader)"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-300 border-purple-500"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center justify-center space-y-6">
        <Button
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/20 rounded-xl px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
          onClick={() => console.log("Apply to join team")}
        >
          Apply to Join Team
        </Button>
      </div>

      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="bg-gray-900 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-cyan-400">Member Profile</DialogTitle>
          </DialogHeader>
          {selectedMember && <ReadOnlyProfile userData={selectedMember} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

