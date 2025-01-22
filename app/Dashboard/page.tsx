"use client"
import React, { useState, useEffect } from 'react'
import { Search, Zap, FileCode, Users, HelpCircle, Sun, Moon, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EventOverview from '../components/EventOverview'
import ProjectShowcase from '../components/ProjectShowcase'
import Leaderboard from '../components/Leaderboard'
import LiveAnnouncements from '../components/LiveAnnouncements'
import ScheduleModal from '../components/ScheduleModal'
import { useClerk } from '@clerk/clerk-react'

export default function HackathonDashboard() {
  const { signOut } = useClerk()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)

  // ... rest of the existing state and handlers ...

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
            <Button
              variant="ghost"
              className="rounded-full p-2"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ?
                <Sun className="h-5 w-5 text-yellow-400" /> :
                <Moon className="h-5 w-5 text-gray-400" />
              }
            </Button>
          </div>

          <div className="flex items-center space-x-6 w-full md:w-auto">
            <form className="flex-1 md:w-96">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search projects, teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800/50 border-gray-700 text-gray-100 focus:border-cyan-400 rounded-xl pl-12 pr-4 h-12"
                />
                <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
            <Button
              onClick={() => setIsScheduleOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20 rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule
            </Button>
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12">
            <EventOverview />
          </div>
          <div className="lg:col-span-5 space-y-8"> {/* Increased width slightly for ProjectShowcase */}
            <ProjectShowcase />
          </div>
          <div className="lg:col-span-4 space-y-8"> {/* Middle column */}
            <LiveAnnouncements />
          </div>
          <div className="lg:col-span-3 space-y-8"> {/* Decreased width slightly for Leaderboard */}
            <Leaderboard />
          </div>
        </div>


        <div className="fixed bottom-8 right-8 space-x-4">
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/20 rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200">
            <FileCode className="h-5 w-5 mr-2" /> Submit Project
          </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/20 rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200">
            <Users className="h-5 w-5 mr-2" /> Join Team
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/20 rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200">
            <HelpCircle className="h-5 w-5 mr-2" /> Ask for Help
          </Button>
        </div>

        <ScheduleModal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
        />
      </div>
    </div>
  )
}