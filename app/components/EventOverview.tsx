import React from "react"
import { Clock, Users, Code, Award, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { 
    icon: Clock, 
    label: "Time Remaining", 
    value: "23:45:30", 
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    gradient: "from-cyan-500 to-cyan-600" 
  },
  { 
    icon: Users, 
    label: "Participants", 
    value: "1,234", 
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    gradient: "from-green-500 to-green-600"
  },
  { 
    icon: Code, 
    label: "Projects", 
    value: "256", 
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    gradient: "from-purple-500 to-purple-600"
  },
  { 
    icon: Award, 
    label: "Prizes", 
    value: "$50,000", 
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    gradient: "from-yellow-500 to-yellow-600"
  },
]

const EventOverview: React.FC = () => {
  return (
    <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-cyan-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-400">
            Event Progress
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`p-6 ${stat.bgColor} rounded-xl hover:scale-105 transition-all duration-200`}
            >
              <div className="flex items-center mb-3">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-medium text-gray-300 ml-3">
                  {stat.label}
                </h3>
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EventOverview