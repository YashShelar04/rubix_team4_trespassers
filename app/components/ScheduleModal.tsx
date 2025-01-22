import React from "react"
import { Calendar, Clock, MapPin, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const scheduleData = [
  {
    time: "9:00 AM",
    event: "Opening Ceremony",
    location: "Main Hall",
    type: "ceremony",
  },
  {
    time: "10:00 AM",
    event: "Team Formation",
    location: "Collaboration Space",
    type: "activity",
  },
  {
    time: "12:00 PM",
    event: "Technical Workshop",
    location: "Workshop Room A",
    type: "workshop",
  },
  {
    time: "3:00 PM",
    event: "Mentoring Session",
    location: "Meeting Rooms",
    type: "mentoring",
  },
  {
    time: "6:00 PM",
    event: "Progress Check-in",
    location: "Main Stage",
    type: "milestone",
  },
]

const getEventColor = (type: string) => {
  const colors = {
    ceremony: "from-yellow-500 to-orange-500",
    activity: "from-green-500 to-emerald-500",
    workshop: "from-blue-500 to-cyan-500",
    mentoring: "from-purple-500 to-pink-500",
    milestone: "from-red-500 to-pink-500",
  }
  return colors[type] || "from-gray-500 to-slate-500"
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-50 w-full max-w-2xl mx-4">
        <Card className="bg-gray-800/90 border-none shadow-2xl">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-purple-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Today's Schedule
                </span>
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="hover:bg-gray-700/50 rounded-full p-2"
              >
                <X className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-6 w-px bg-gray-600/50" />
              <div className="space-y-6">
                {scheduleData.map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-14 group hover:transform hover:translate-x-2 transition-transform duration-200"
                  >
                    <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-gray-700 border-2 border-gray-600 group-hover:border-purple-400 transition-colors duration-200" />
                    <div className="p-4 bg-gray-700/50 rounded-xl group-hover:bg-gray-600/50 transition-all duration-200">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-200 group-hover:text-white transition-colors">
                          {item.event}
                        </h3>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-1 text-purple-400" />
                          <span className="text-gray-300">{item.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.location}
                      </div>
                      <div className={`mt-2 h-1 rounded-full bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity duration-200 ${getEventColor(item.type)}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ScheduleModal