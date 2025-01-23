"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Users, Trophy, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Profile from "../components/Profile"
import Hackathons from "../components/Hackathons"
import { TeamsSection } from "../components/TeamsSection"

// Sample data - Consider moving this to a separate file
const sampleUserData = {
  name: "Yash Shelar",
  email: "ydshelar04@gmail.com",
  skills: ["React", "TypeScript", "Node.js", "UI/UX", "Python"],
  interests: ["AI/ML", "Web3", "Mobile Dev"],
  experienceLevel: "Intermediate",
  bio: "Full-stack developer with a passion for creating intuitive user experiences and solving complex problems.",
  profilePicture: "/api/placeholder/150/150",
  teams: [
    {
      id: 1,
      name: "Innovation Squad",
      avatar: "/api/placeholder/100/100",
      status: "Active",
      description: "A team focused on developing cutting-edge AI solutions",
      members: [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Team Lead",
          avatar: "/api/placeholder/100/100"
        },
        {
          id: 2,
          name: "John Doe",
          role: "Backend Developer",
          avatar: "/api/placeholder/100/100"
        },
        {
          id: 3,
          name: "Lisa Wong",
          role: "ML Engineer",
          avatar: "/api/placeholder/100/100"
        }
      ],
      currentProject: "AI Chat Interface",
      joinedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Web3 Pioneers",
      avatar: "/api/placeholder/100/100",
      status: "Active",
      description: "Exploring and building decentralized applications",
      members: [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Frontend Developer",
          avatar: "/api/placeholder/100/100"
        },
        {
          id: 4,
          name: "Mike Brown",
          role: "Smart Contract Developer",
          avatar: "/api/placeholder/100/100"
        },
        {
          id: 5,
          name: "Emma Davis",
          role: "Product Manager",
          avatar: "/api/placeholder/100/100"
        }
      ],
      currentProject: "DeFi Dashboard",
      joinedDate: "2024-02-01"
    },
    {
      id: 3,
      name: "Mobile Masters",
      avatar: "/api/placeholder/100/100",
      status: "Active",
      description: "Creating next-generation mobile applications",
      members: [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Full Stack Developer",
          avatar: "/api/placeholder/100/100"
        },
        {
          id: 6,
          name: "Alex Chen",
          role: "iOS Developer",
          avatar: "/api/placeholder/100/100"
        },
        {
          id: 7,
          name: "Rachel Kim",
          role: "UI/UX Designer",
          avatar: "/api/placeholder/100/100"
        }
      ],
      currentProject: "Task Manager Pro Mobile",
      joinedDate: "2024-03-01"
    }
  ],
  projects: [
    {
      id: 1,
      name: "AI Chat Interface",
      screenshot: ["/api/placeholder/300/200", "/api/placeholder/300/200"],
      hackathon: "AI Innovate 2024",
      type: "Hackathon Project",
      description: "An advanced AI-powered chat interface that uses natural language processing to provide intelligent responses.",
      technologies: ["React", "Node.js", "OpenAI API"],
      features: [
        {
          name: "Real-time chat",
          description: "Instant messaging with AI"
        },
        {
          name: "Context awareness",
          description: "AI remembers conversation history"
        }
      ],
      link: "https://github.com/example/ai-chat"
    },
    {
      id: 2,
      name: "Task Manager Pro",
      screenshot: ["/api/placeholder/300/200"],
      type: "Personal Project",
      description: "A comprehensive task management application with advanced features for productivity.",
      technologies: ["Vue.js", "Express", "MongoDB"],
      features: [
        {
          name: "Task prioritization",
          description: "Organize tasks by importance"
        },
        {
          name: "Collaboration",
          description: "Share and assign tasks to team members"
        }
      ],
      link: "https://taskmanager-pro.demo.com"
    }
  ],
  hackathons: [
    {
      id: 1,
      name: "AI Innovate 2024",
      poster: "/api/placeholder/400/300",
      status: "completed",
      date: "March 15-17, 2024",
      description: "Create innovative AI solutions to real-world problems.",
      participants: 500,
      prize: "$10,000"
    },
    {
      id: 2,
      name: "Web3 Revolution",
      poster: "/api/placeholder/400/300",
      status: "ongoing",
      date: "April 1-30, 2024",
      description: "Build decentralized applications for the future of the internet.",
      participants: 1000,
      prize: "$20,000"
    },
    {
      id: 3,
      name: "Mobile App Challenge",
      poster: "/api/placeholder/400/300",
      status: "upcoming",
      date: "May 10-12, 2024",
      description: "Develop innovative mobile apps to solve everyday problems.",
      participants: 300,
      prize: "$5,000"
    }
  ]
}

const menuItems = [
  { icon: <User className="w-5 h-5" />, label: "Profile", color: "text-cyan-400" },
  { icon: <Trophy className="w-5 h-5" />, label: "My Hackathons", color: "text-purple-400" },
  { icon: <Users className="w-5 h-5" />, label: "My Teams", color: "text-green-400" },
]

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Profile")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [userData, setUserData] = useState(sampleUserData)

  const renderContent = () => {
    switch (activeSection) {
      case "Profile":
        return <Profile userData={userData} setUserData={setUserData} />
      case "My Hackathons":
        return <Hackathons userData={userData} />
      case "My Teams":
        return <TeamsSection userData={userData}/>
      default:
        return <Profile userData={userData} setUserData={setUserData} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-full bg-gray-800 shadow-lg z-20 ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 ease-in-out`}
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            <h1
              className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              Dashboard
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-full hover:bg-gray-700"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <ScrollArea className="flex-grow">
            <nav className="space-y-2 p-4">
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={`w-full justify-start hover:bg-gray-700 transition-colors ${
                    activeSection === item.label ? "bg-gray-700" : ""
                  }`}
                  onClick={() => setActiveSection(item.label)}
                >
                  <div className={`${item.color} mr-2`}>{item.icon}</div>
                  <span className={`${isSidebarOpen ? "block" : "hidden"}`}>{item.label}</span>
                </Button>
              ))}
            </nav>
          </ScrollArea>
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={userData.profilePicture} />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
                <p className="text-sm font-medium">{userData.name}</p>
                <p className="text-xs text-gray-400">{userData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div
        className={`flex-1 overflow-y-auto ${isSidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300 ease-in-out`}
      >
        <div className="min-h-screen bg-gray-900 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}