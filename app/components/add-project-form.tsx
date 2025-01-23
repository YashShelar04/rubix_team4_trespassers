"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Project {
  id: string
  title: string
  description: string
  image: string
  email: string
  cost: number
}

interface AddProjectFormProps {
  onAddProject: (project: Project) => void
  onClose: () => void
}

export function AddProjectForm({ onAddProject, onClose }: AddProjectFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [email, setEmail] = useState("")
  const [cost, setCost] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProject: Project = {
      id: Date.now().toString(),
      title,
      description,
      image: image || "/placeholder.svg?height=200&width=300",
      email,
      cost: Number.parseFloat(cost),
    }
    onAddProject(newProject)
    setTitle("")
    setDescription("")
    setImage("")
    setEmail("")
    setCost("")
  }

  return (
    <Card className="mb-6 bg-card border-0 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-[#00E5B7]">Add New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-background/50 border-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="bg-background/50 border-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
              Image URL
            </label>
            <Input
              id="image"
              type="url"
              placeholder="Enter image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="bg-background/50 border-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Developer Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter developer email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/50 border-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="cost" className="block text-sm font-medium text-gray-300 mb-1">
              Cost
            </label>
            <Input
              id="cost"
              type="number"
              placeholder="Enter project cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
              min="0"
              step="0.01"
              className="bg-background/50 border-gray-700 text-white"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#9747FF] hover:bg-[#8035FF] text-white">
              Add Project
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

