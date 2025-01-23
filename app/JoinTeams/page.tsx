"use client"

import { useState, useEffect } from "react"
import { Search, Users, CheckCircle, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for demonstration
const mockTeams = [
  {
    id: "1bdskdjjkff",
    name: "Team Alpha",
    domain: "Web Development",
    requiredSkills: ["React", "Node.js", "MongoDB"],
    vacancies: 2,
  },
  {
    id: "2bdsk",
    name: "Team Beta",
    domain: "Mobile Development",
    requiredSkills: ["React Native", "Firebase", "Redux"],
    vacancies: 1,
  },
  { id: "3bsdk", name: "Team Gamma", domain: "AI/ML", requiredSkills: ["Python", "TensorFlow", "PyTorch"], vacancies: 3 },
  {
    id: "4bsdk",
    name: "Team Delta",
    domain: "Blockchain",
    requiredSkills: ["Solidity", "Ethereum", "Web3.js"],
    vacancies: 2,
  },
]

const domains = ["All", "Web Development", "Mobile Development", "AI/ML", "Blockchain"]

export default function JoinTeam({ userSkills = ["React", "Node.js", "MongoDB", "Python"] }) {
  const [selectedDomain, setSelectedDomain] = useState("All")
  const [filteredTeams, setFilteredTeams] = useState(mockTeams)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    filterTeams()
  }, [selectedDomain, searchQuery])

  const filterTeams = () => {
    let filtered = mockTeams
    if (selectedDomain !== "All") {
      filtered = filtered.filter((team) => team.domain === selectedDomain)
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (team) =>
          team.id.toLowerCase().includes(searchQuery.toLowerCase()) 

      )
    }
    filtered = filtered.filter((team) => {
      const matchingSkills = team.requiredSkills.filter((skill) => userSkills.includes(skill))
      return matchingSkills.length / team.requiredSkills.length > 0.3
    })
    setFilteredTeams(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-green-400 to-purple-500">
          Join a Team
        </h1>

        <div className="mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-cyan-400 flex items-center">
                <Filter className="mr-2" size={20} />
                Filter Teams
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search team by unique code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 text-gray-100 focus:border-cyan-400 rounded-xl pl-4 pr-4 h-12"
                />
              </div>
              <Select onValueChange={setSelectedDomain} defaultValue={selectedDomain}>
                <SelectTrigger className="w-full md:w-[200px] bg-gray-700 border-gray-600 text-gray-100 focus:border-cyan-400 rounded-xl h-12">
                  <SelectValue placeholder="Select Domain" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {domains.map((domain) => (
                    <SelectItem
                      key={domain}
                      value={domain}
                      className="text-gray-100 focus:bg-gray-600 focus:text-cyan-400"
                    >
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <Card
              key={team.id}
              className="bg-gray-800 border-gray-700 hover:border-cyan-400 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-cyan-400">{team.name}</CardTitle>
                <CardDescription className="text-gray-400">{team.domain}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {team.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-gray-700 text-cyan-400">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    <Users className="inline mr-1" size={16} />
                    {team.vacancies} {team.vacancies === 1 ? "vacancy" : "vacancies"}
                  </span>
                  <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-400">
                    <CheckCircle className="mr-1" size={14} />
                    {userSkills.filter((skill) => team.requiredSkills.includes(skill)).length} skills matching
                  </Badge>
                </div>
                <Link href={`/team/${team.id}`} passHref>
                  <Button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/20 rounded-xl transform hover:scale-105 transition-all duration-200">
                    View Team Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

