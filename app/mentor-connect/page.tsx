"use client"
import Link from "next/link"
import { useState } from "react"
import NavBar from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Video, ArrowLeft, Users, Sparkles } from "lucide-react"

type View = "initial" | "mentor-form" | "mentor-list"

interface Mentor {
  id: string
  name: string
  domain: string
  rating: number
  sessions: number
}

// Sample mentor data
const mentors: Mentor[] = [
  { id: "1", name: "John Doe", domain: "Web Development", rating: 4.8, sessions: 24 },
  { id: "2", name: "Jane Smith", domain: "Machine Learning", rating: 4.9, sessions: 32 },
  { id: "3", name: "Mike Johnson", domain: "Mobile Development", rating: 4.7, sessions: 18 },
  { id: "4", name: "Sarah Wilson", domain: "UI/UX Design", rating: 4.9, sessions: 45 },
]

export default function MentorConnect() {
  const [view, setView] = useState<View>("initial")
  const [domain, setDomain] = useState("")

  const handleStartMeet = () => {
    if (view === "mentor-form") {
      console.log("Starting meet with domain:", domain)
    } else {
      setView("mentor-form")
    }
  }

  const handleMentorClick = (mentorId: string) => {
    console.log("Selected mentor:", mentorId)
  }

  const handleBack = () => {
    setView("initial")
    setDomain("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
         <Link href="/" className="fixed top-8 left-8 text-white hover:text-cyan-400 transition-colors duration-200">
        <ArrowLeft className="h-6 w-6" />
      </Link>
      <div className="container mx-auto px-6 py-8">
        <div className="flex-1 flex items-center justify-center min-h-[80vh]">
          {view === "initial" && (
            <Card className="w-full max-w-lg mx-4 bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold flex flex-col items-center gap-4">
                  <div className="relative">
                    <Sparkles className="h-12 w-12 text-cyan-400 animate-pulse" />
                    <div className="absolute -inset-1 bg-cyan-400 opacity-20 rounded-full blur-xl"></div>
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-green-400 to-purple-500">
                    Looking for Mentorship?
                  </span>
                </CardTitle>
                <CardDescription className="text-lg mt-2 text-gray-300">
                  If you are a mentee seeking support, you can click on Search for Mentors.
                  For QnA Forum {" "}
                  <Link href={`/forum`} className="text-cyan-400 hover:underline">
                  Click Here
                  </Link>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 items-center">
                <Button
                  className="w-full max-w-sm bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-lg shadow-cyan-500/20 transform hover:scale-105 transition-all duration-200"
                  size="lg"
                  onClick={handleStartMeet}
                >
                  <Video className="mr-2 h-5 w-5" />
                  Start a Meet
                </Button>
                <Button
                  className="w-full max-w-sm bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg shadow-purple-500/20 transform hover:scale-105 transition-all duration-200"
                  size="lg"
                  onClick={() => setView("mentor-list")}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search Mentors
                </Button>
              </CardContent>
            </Card>
          )}

          {view === "mentor-form" && (
            <div className="w-full max-w-lg mx-4">
              <Button
                variant="ghost"
                size="sm"
                className="mb-4 text-gray-300 hover:text-white hover:bg-gray-700/50"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-cyan-400">Start Mentoring</CardTitle>
                  <CardDescription className="text-lg mt-2 text-gray-300">
                    Enter your domain of expertise to start the meeting
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Input
                    placeholder="Enter your domain (e.g., Web Development)"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-gray-100 focus:border-cyan-400"
                  />
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all duration-200"
                    size="lg"
                    onClick={handleStartMeet}
                    disabled={!domain.trim()}
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Start Meet
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {view === "mentor-list" && (
            <div className="w-full max-w-2xl mx-4 mt-24">
              <Button
                variant="ghost"
                size="sm"
                className="mb-4 text-gray-300 hover:text-white hover:bg-gray-700/50"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                Available Mentors
              </h2>
              <div className="grid gap-4">
                {mentors.map((mentor) => (
                  <Card
                    key={mentor.id}
                    className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm hover:bg-gray-700/50 cursor-pointer transform hover:scale-[1.02] transition-all duration-200"
                    onClick={() => handleMentorClick(mentor.id)}
                  >
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg text-gray-100">{mentor.name}</h3>
                        <p className="text-cyan-400">{mentor.domain}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {mentor.sessions} sessions
                          </span>
                          <span>⭐ {mentor.rating}</span>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

