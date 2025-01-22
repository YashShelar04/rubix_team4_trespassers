import React from "react"
import { Radio, Megaphone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const announcements = [
  {
    id: 1,
    message: "New API workshop starting in 15 minutes at Workshop Room B!",
    time: "2 mins ago",
    type: "urgent"
  },
  {
    id: 2,
    message: "Lunch will be served in the main hall",
    time: "15 mins ago",
    type: "info"
  },
  {
    id: 3,
    message: "Mentor Office Hours are now open for all teams",
    time: "30 mins ago",
    type: "important"
  },
  {
    id: 4,
    message: "Don't forget to commit your code regularly!",
    time: "45 mins ago",
    type: "reminder"
  }
]

const LiveAnnouncements = () => {
  return (
    <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <Radio className="h-6 w-6 mr-2 text-red-400 animate-pulse" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
            Live Announcements
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-4 bg-gray-700/50 rounded-xl hover:bg-gray-600/50 transition-all duration-200 group"
            >
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <Megaphone className={`h-5 w-5 ${
                    announcement.type === 'urgent' ? 'text-red-400' :
                    announcement.type === 'important' ? 'text-yellow-400' :
                    announcement.type === 'info' ? 'text-blue-400' :
                    'text-green-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-200 group-hover:text-white transition-colors">
                    {announcement.message}
                  </p>
                  <span className="text-sm text-gray-400 mt-1 block">
                    {announcement.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default LiveAnnouncements