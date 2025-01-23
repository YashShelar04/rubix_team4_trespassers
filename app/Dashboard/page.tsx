"use client"
import React, { useState, useEffect } from "react"
import { Search, Zap, FileCode, Users, HelpCircle, Sun, Moon, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EventOverview from "../components/EventOverview"
import ProjectShowcase from "../components/ProjectShowcase"
import Leaderboard from "../components/Leaderboard"
import LiveAnnouncements from "../components/LiveAnnouncements"
import ScheduleModal from "../components/ScheduleModal"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useClerk } from '@clerk/clerk-react';
import { useRouter } from 'next/router';

export default function HackathonDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const user = { name: "John Doe", profilePicture: "/placeholder-avatar.png" } // Example user data
  const { signOut } = useClerk();
  // const router = useRouter();

  const handleSignOut = () => {
    signOut().then(() => {
      window.location.href = '/';
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6 py-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <h1 className="text-5xl font-bold flex items-center">
              <div className="relative">
                <Zap className="h-12 w-12 text-cyan-400 animate-pulse" />
                <div className="absolute -inset-1 bg-cyan-400 opacity-20 rounded-full blur-xl"></div>
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-green-400 to-purple-500 ml-4">
                Hackathon Hub
              </span>
            </h1>
            <Button variant="ghost" className="rounded-full p-2" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-400" />}
            </Button>
          </div>

          <div className="flex items-center space-x-6 w-full md:w-auto justify-end relative z-10">
          <Button
              onClick={() => window.location.href = 'http://localhost:5173'}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20 rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200"
            >
              Virtual Environment
            </Button>
          <Link href="/freelance">
          <Button
              // onClick={() => setIsScheduleOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20 rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200"
            >
              Freelance
            </Button>
          </Link>
          
            <Button
              onClick={() => setIsScheduleOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20 rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule
            </Button>
            <Link href="/userDashboard" className="ml-4 relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300"></div>
              <Avatar className="h-10 w-10 cursor-pointer border-2 border-transparent group-hover:border-white transition-all duration-300 relative z-10">
                <AvatarImage src={user.profilePicture || "/placeholder-avatar.png"} alt={user.name} />
                <AvatarFallback className="bg-gray-800 text-cyan-400">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 flex justify-end">
            <button onClick={handleSignOut} className="btn btn-primary">
              Sign Out
            </button>
          </div>
          <div className="lg:col-span-12">
            <EventOverview />
          </div>
          <div className="lg:col-span-5 space-y-8">
            {" "}
            {/* Increased width slightly for ProjectShowcase */}
            <ProjectShowcase />
          </div>
          <div className="lg:col-span-4 space-y-8">
            {" "}
            {/* Middle column */}
            <LiveAnnouncements />
          </div>
          <div className="lg:col-span-3 space-y-8">
            {" "}
            {/* Decreased width slightly for Leaderboard */}
            <Leaderboard />
          </div>
        </div>

        <div className="fixed bottom-8 right-8 space-x-4">
         
          <Link href="/JoinTeams">
            <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/20 rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200">
              <Users className="h-5 w-5 mr-2" /> Join Team
            </Button>
          </Link>
          <Link href="/mentor-connect">
          <Button 
            // onClick={handleMentorSessionsClick}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/20 rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200"
          >
            <HelpCircle className="h-5 w-5 mr-2" /> Mentor Sessions
          </Button>
          </Link>
          
        </div>

        <ScheduleModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
      </div>
    </div>
  )
}
