import type React from "react"
import { useState, useEffect } from "react"
import { Edit2, X, Check, Plus, Users, Upload } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { TeamsSection } from "./TeamsSection"
import { Combobox } from "@/components/ui/combobox"

interface Feature {
  name: string
  description: string
}

interface Project {
  id: number
  name: string
  screenshots: string[]
  type: string
  hackathon?: string
  description: string
  technologies: string[]
  features: Feature[]
  link: string
}

interface ProfileProps {
  userData: any
  setUserData: (data: any) => void
}

const techOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "PHP",
  "HTML",
  "CSS",
  "SASS",
  "TailwindCSS",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "GraphQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud",
  "Firebase",
  "Vercel",
  "Netlify",
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
]

export default function Profile({ userData, setUserData }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [newProject, setNewProject] = useState<Project>({
    id: 0,
    name: "",
    screenshots: [],
    type: "",
    description: "",
    technologies: [],
    features: [],
    link: "",
  })
  const [newTechnology, setNewTechnology] = useState("")
  const [techSuggestions, setTechSuggestions] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState<Feature>({ name: "", description: "" })
  const router = useRouter()

  const handleAddItem = (e: React.KeyboardEvent<HTMLInputElement>, type: "skills" | "interests" | "technologies") => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      if (type === "technologies") {
        setNewProject((prev) => ({
          ...prev,
          technologies: [...prev.technologies, e.currentTarget.value.trim()],
        }))
        setNewTechnology("")
      } else {
        setUserData((prev: any) => ({
          ...prev,
          [type]: [...prev[type], e.currentTarget.value.trim()],
        }))
        if (type === "skills") {
          setNewSkill("")
        } else {
          setNewInterest("")
        }
      }
    }
  }

  const handleRemoveItem = (itemToRemove: string, type: "skills" | "interests" | "technologies") => {
    if (type === "technologies") {
      setNewProject((prev) => ({
        ...prev,
        technologies: prev.technologies.filter((item) => item !== itemToRemove),
      }))
    } else {
      setUserData((prev: any) => ({
        ...prev,
        [type]: prev[type].filter((item: string) => item !== itemToRemove),
      }))
    }
  }

  const handleSaveChanges = () => {
    console.log("Saving changes:", userData)
    setIsEditing(false)
  }

  const handleAddProject = () => {
    if (
      !newProject.name ||
      !newProject.description ||
      newProject.screenshots.length === 0 ||
      !newProject.link ||
      newProject.technologies.length === 0
    ) {
      alert("Please fill in all required fields (name, description, at least one image, link, and technologies)")
      return
    }

    const projectWithId = {
      ...newProject,
      id: userData.projects.length + 1,
    }

    setUserData((prev: any) => ({
      ...prev,
      projects: [...prev.projects, projectWithId],
    }))

    setNewProject({
      id: 0,
      name: "",
      screenshots: [],
      type: "",
      description: "",
      technologies: [],
      features: [],
      link: "",
    })
    setIsAddingProject(false)
  }

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProject((prev) => ({
          ...prev,
          screenshots: [...prev.screenshots, reader.result as string],
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddFeature = () => {
    if (newFeature.name && newFeature.description) {
      setNewProject((prev) => ({
        ...prev,
        features: [...prev.features, newFeature],
      }))
      setNewFeature({ name: "", description: "" })
    }
  }

  const handleTechInput = (input: string) => {
    setNewTechnology(input)
    const filteredSuggestions = techOptions.filter((tech) => tech.toLowerCase().includes(input.toLowerCase()))
    setTechSuggestions(filteredSuggestions)
  }

  const handleAddTech = (tech: string) => {
    if (!newProject.technologies.includes(tech)) {
      setNewProject((prev) => ({
        ...prev,
        technologies: [...prev.technologies, tech],
      }))
    }
    setNewTechnology("")
    setTechSuggestions([])
  }

  return (
    <div className="space-y-6">
      {/* Header with Edit Button and Teams Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
          Profile Overview
        </h2>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="hover:bg-purple-700 text-purple-400">
                <Users className="w-4 h-4 mr-2" />
                Teams
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-gray-900">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-white">My Teams</DialogTitle>
                <DialogDescription className="font-semibold text-white">Teams that {userData.name} is a part of</DialogDescription>
              </DialogHeader>
              <TeamsSection userData={userData} />
            </DialogContent>
          </Dialog>
          {isEditing ? (
            <>
              <Button onClick={handleSaveChanges} variant="ghost" className="hover:bg-green-700 text-green-400">
                <Check className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="ghost" className="hover:bg-red-700 text-red-400">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="ghost" className="hover:bg-cyan-700 text-cyan-400">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Main Profile Card */}
      <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <Avatar className="w-20 h-20 border-2 border-cyan-400/20">
                <AvatarImage src={userData.profilePicture} />
                <AvatarFallback className="bg-cyan-400/10 text-cyan-400">
                  {userData.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-grow space-y-4">
              <div>
                {isEditing ? (
                  <Input
                    value={userData.name}
                    onChange={(e) => setUserData((prev: any) => ({ ...prev, name: e.target.value }))}
                    className="text-lg font-semibold bg-gray-700/50 border-cyan-400 focus:ring-cyan-400"
                  />
                ) : (
                  <h3 className="text-lg font-semibold text-white">{userData.name}</h3>
                )}
                <p className="text-gray-400">{userData.email}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Bio</h4>
                {isEditing ? (
                  <Textarea
                    value={userData.bio}
                    onChange={(e) => setUserData((prev: any) => ({ ...prev, bio: e.target.value }))}
                    className="w-full h-24 bg-gray-700/50 border-cyan-400 focus:ring-cyan-400 text-white resize-none"
                  />
                ) : (
                  <p className="text-gray-300 text-sm">{userData.bio}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-cyan-400">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="bg-cyan-400/10 text-cyan-400 border-cyan-400">
                  {skill}
                  {isEditing && (
                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => handleRemoveItem(skill, "skills")} />
                  )}
                </Badge>
              ))}
              {isEditing && (
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => handleAddItem(e, "skills")}
                  placeholder="Add skill..."
                  className="w-32 h-8 bg-gray-700/50 border-cyan-400 focus:ring-cyan-400"
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-purple-400">Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userData.interests.map((interest: string) => (
                <Badge
                  key={interest}
                  variant="secondary"
                  className="bg-purple-400/10 text-purple-400 border-purple-400"
                >
                  {interest}
                  {isEditing && (
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handleRemoveItem(interest, "interests")}
                    />
                  )}
                </Badge>
              ))}
              {isEditing && (
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => handleAddItem(e, "interests")}
                  placeholder="Add interest..."
                  className="w-32 h-8 bg-gray-700/50 border-purple-400 focus:ring-purple-400"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-green-400">Projects</CardTitle>
            {isEditing && (
              <Button
                variant="ghost"
                className="text-green-400 hover:bg-green-400/10"
                onClick={() => setIsAddingProject(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            )}
          </div>
          <CardDescription className="text-gray-400">Personal and hackathon projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.projects.map((project: Project) => (
              <Card
                key={project.id}
                className="group relative bg-gray-800/50 border-none shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/Project/${project.id}`)}
              >
                <CardContent className="p-0">
                  <div className="aspect-video rounded-t-lg overflow-hidden">
                    <img
                      src={
                        project.screenshots && project.screenshots.length > 0
                          ? project.screenshots[0]
                          : "/placeholder.svg"
                      }
                      alt={project.name}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-gray-200 text-lg">{project.name}</h4>
                    <p className="text-sm text-gray-400">{project.type}</p>
                    {project.hackathon && (
                      <Badge
                        variant="secondary"
                        className="mt-2 text-sm bg-purple-400/10 text-purple-400 border-purple-400"
                      >
                        {project.hackathon}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Project Dialog */}
      <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
        <DialogContent className="sm:max-w-[600px] bg-gray-900 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">Add New Project</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new project to showcase in your profile
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300">Project Name*</label>
              <Input
                value={newProject.name}
                onChange={(e) => setNewProject((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-gray-800 text-white border-gray-700 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Project Type</label>
              <Input
                value={newProject.type}
                onChange={(e) => setNewProject((prev) => ({ ...prev, type: e.target.value }))}
                className="bg-gray-800"
                placeholder="Personal Project / Hackathon Project"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Description*</label>
              <Textarea
                value={newProject.description}
                onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-gray-800"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Technologies*</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newProject.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500">
                    {tech}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer hover:text-blue-100"
                      onClick={() => handleRemoveItem(tech, "technologies")}
                    />
                  </Badge>
                ))}
              </div>
              <Input
                value={newTechnology}
                onChange={(e) => handleTechInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddTech(newTechnology)
                  }
                }}
                placeholder="Add technology..."
                className="bg-gray-800"
              />
              {techSuggestions.length > 0 && (
                <ul className="mt-2 bg-gray-800 rounded-md border border-gray-700 max-h-32 overflow-y-auto">
                  {techSuggestions.map((tech) => (
                    <li
                      key={tech}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-700 text-gray-300"
                      onClick={() => handleAddTech(tech)}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-400">Project Link* (GitHub or Hosted)</label>
              <Input
                value={newProject.link}
                onChange={(e) => setNewProject((prev) => ({ ...prev, link: e.target.value }))}
                className="bg-gray-800"
                placeholder="https://github.com/your-project"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Project Images*</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newProject.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative">
                    <img
                      src={screenshot || "/placeholder.svg"}
                      alt={`Screenshot ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() =>
                        setNewProject((prev) => ({
                          ...prev,
                          screenshots: prev.screenshots.filter((_, i) => i !== index),
                        }))
                      }
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <Input type="file" accept="image/*" onChange={handleAddImage} className="bg-gray-800" />
            </div>
            <div>
              <label className="text-sm text-gray-400">Features</label>
              <div className="space-y-2">
                {newProject.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature.name}
                      onChange={(e) => {
                        const updatedFeatures = [...newProject.features]
                        updatedFeatures[index].name = e.target.value
                        setNewProject((prev) => ({ ...prev, features: updatedFeatures }))
                      }}
                      className="bg-gray-800 text-white border-gray-700 focus:border-blue-500"
                      placeholder="Feature name"
                    />
                    <Input
                      value={feature.description}
                      onChange={(e) => {
                        const updatedFeatures = [...newProject.features]
                        updatedFeatures[index].description = e.target.value
                        setNewProject((prev) => ({ ...prev, features: updatedFeatures }))
                      }}
                      className="bg-gray-800 text-white border-gray-700 focus:border-blue-500"
                      placeholder="Feature description"
                    />
                    <Button
                      variant="ghost"
                      className="text-red-400 hover:bg-red-400/10"
                      onClick={() => {
                        const updatedFeatures = newProject.features.filter((_, i) => i !== index)
                        setNewProject((prev) => ({ ...prev, features: updatedFeatures }))
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  value={newFeature.name}
                  onChange={(e) => setNewFeature((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800"
                  placeholder="New feature name"
                />
                <Input
                  value={newFeature.description}
                  onChange={(e) => setNewFeature((prev) => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800"
                  placeholder="New feature description"
                />
                <Button variant="ghost" className="text-green-400 hover:bg-green-400/10" onClick={handleAddFeature}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="bg-gray-900 border-t border-gray-800 py-4">
            <Button
              variant="outline"
              className="hover:bg-red-700 text-red-400 border-red-400"
              onClick={() => setIsAddingProject(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="hover:bg-green-700 text-green-400 border-green-400"
              onClick={handleAddProject}
            >
              Add Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

