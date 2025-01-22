import React from "react"
import { Trophy, Medal, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const leaderboardData = [
  { rank: 1, team: "Code Wizards", score: 2500, change: "+120" },
  { rank: 2, team: "Binary Bosses", score: 2350, change: "+95" },
  { rank: 3, team: "Pixel Pioneers", score: 2200, change: "+82" },
  { rank: 4, team: "Data Dynamos", score: 2100, change: "+65" },
  { rank: 5, team: "Algorithm Aces", score: 2000, change: "+43" },
]

const Leaderboard: React.FC = () => {
  return (
    <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <Crown className="h-6 w-6 mr-2 text-yellow-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
            Top Performers
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((item, index) => (
            <div
              key={item.rank}
              className="relative p-4 bg-gray-700/50 rounded-xl hover:bg-gray-600/50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                    index === 0 ? "bg-yellow-400/20" :
                    index === 1 ? "bg-gray-400/20" :
                    index === 2 ? "bg-orange-400/20" :
                    "bg-cyan-400/20"
                  }`}>
                    <span className={`text-xl font-bold ${
                      index === 0 ? "text-yellow-400" :
                      index === 1 ? "text-gray-400" :
                      index === 2 ? "text-orange-400" :
                      "text-cyan-400"
                    }`}>
                      {item.rank}
                    </span>
                  </div>
                  <div>
                    <span className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
                      {item.team}
                    </span>
                    <div className="text-sm text-green-400">
                      {item.change} pts
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-cyan-400">
                    {item.score.toLocaleString()}
                  </span>
                  {index < 3 && (
                    <Medal
                      className={`h-5 w-5 ${
                        index === 0 ? "text-yellow-400" :
                        index === 1 ? "text-gray-400" :
                        "text-orange-400"
                      }`}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Leaderboard