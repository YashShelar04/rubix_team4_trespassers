import React from "react"
import { Star, GitBranch, ThumbsUp, ExternalLink, Rocket } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const projects = [
  { 
    id: 1, 
    name: "AI-Powered Smart City", 
    team: "Team Innovators", 
    likes: 156, 
    stars: 23, 
    forks: 12,
    tags: ["AI", "IoT", "Smart City"],
    progress: 75
  },
  { 
    id: 2, 
    name: "Blockchain Voting System", 
    team: "Crypto Coders", 
    likes: 132, 
    stars: 19, 
    forks: 8,
    tags: ["Blockchain", "Security", "Web3"],
    progress: 60
  },
  { 
    id: 3, 
    name: "AR Education Platform", 
    team: "Future Learners", 
    likes: 98, 
    stars: 15, 
    forks: 5,
    tags: ["AR", "Education", "Mobile"],
    progress: 85
  },
]

const ProjectShowcase: React.FC = () => {
  return (
    <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <Rocket className="h-6 w-6 mr-2 text-green-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
            Featured Projects
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 bg-gray-700/50 rounded-xl hover:bg-gray-600/50 transition-all duration-200 group"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">by {project.team}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-gray-600/50 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white rounded-lg px-4 py-2 transform hover:scale-105 transition-all duration-200"
                  >
                    View Project <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-600/50">
                  <div className="flex space-x-6">
                    <div className="flex items-center space-x-2 group/stat">
                      <ThumbsUp className="h-5 w-5 text-blue-400 group-hover/stat:text-blue-300 transition-colors" />
                      <span className="text-gray-300 group-hover/stat:text-gray-200 transition-colors">
                        {project.likes}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 group/stat">
                      <Star className="h-5 w-5 text-yellow-400 group-hover/stat:text-yellow-300 transition-colors" />
                      <span className="text-gray-300 group-hover/stat:text-gray-200 transition-colors">
                        {project.stars}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 group/stat">
                      <GitBranch className="h-5 w-5 text-purple-400 group-hover/stat:text-purple-300 transition-colors" />
                      <span className="text-gray-300 group-hover/stat:text-gray-200 transition-colors">
                        {project.forks}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-700 flex items-center justify-center text-xs font-medium text-gray-300"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-600/50 border-2 border-gray-700 flex items-center justify-center text-xs font-medium text-gray-400 ml-1">
                      +2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectShowcase