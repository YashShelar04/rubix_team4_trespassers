"use client"

import React, { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface HackathonsProps {
  userData: any
}

export default function Hackathons({ userData }: HackathonsProps) {
  const [hackathonFilter, setHackathonFilter] = useState("all")
  const router = useRouter()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
        My Hackathons
      </h2>

      {/* Filter Buttons */}
      <div className="flex space-x-4">
        <Button
          variant={hackathonFilter === "all" ? "default" : "outline"}
          onClick={() => setHackathonFilter("all")}
          className="text-white"
        >
          All
        </Button>
        <Button
          variant={hackathonFilter === "completed" ? "default" : "outline"}
          onClick={() => setHackathonFilter("completed")}
          className="text-white"
        >
          Completed
        </Button>
        <Button
          variant={hackathonFilter === "ongoing" ? "default" : "outline"}
          onClick={() => setHackathonFilter("ongoing")}
          className="text-white"
        >
          Ongoing
        </Button>
        <Button
          variant={hackathonFilter === "upcoming" ? "default" : "outline"}
          onClick={() => setHackathonFilter("upcoming")}
          className="text-white"
        >
          Upcoming
        </Button>
      </div>

      {/* Hackathon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userData.hackathons
          .filter((hackathon: any) => hackathonFilter === "all" || hackathon.status === hackathonFilter)
          .map((hackathon: any) => (
            <Card
              key={hackathon.id}
              className="group relative bg-gray-800/50 border-none shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => router.push(`/hackathon/${hackathon.id}`)}
            >
              <CardContent className="p-0">
                <div className="aspect-video rounded-t-lg overflow-hidden">
                  <img
                    src={hackathon.poster || "/placeholder.svg"}
                    alt={hackathon.name}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-200 text-xl">{hackathon.name}</h4>
                  <p className="text-sm text-gray-400">{hackathon.date}</p>
                  <Badge
                    variant="secondary"
                    className={`mt-2 text-sm ${
                      hackathon.status === "completed"
                        ? "bg-green-400/10 text-green-400 border-green-400"
                        : hackathon.status === "ongoing"
                        ? "bg-blue-400/10 text-blue-400 border-blue-400"
                        : "bg-yellow-400/10 text-yellow-400 border-yellow-400"
                    }`}
                  >
                    {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
                  </Badge>
                  <p className="mt-2 text-sm text-gray-300">{hackathon.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">Participants: {hackathon.participants}</p>
                      <p className="text-sm text-gray-400">Prize: {hackathon.prize}</p>
                    </div>
                    <ArrowRight className="text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}