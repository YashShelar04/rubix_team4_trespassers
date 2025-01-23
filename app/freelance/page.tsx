"use client"

import { useState } from "react"
import { ProjectList } from "@/app/components/project-list"
import { AddProjectForm } from "@/app/components/add-project-form"
import { Button } from "@/components/ui/button"
import { useProjects } from "@/hooks/use-projects"

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const { projects, addProject } = useProjects()

  const handleAddProject = (newProject) => {
    addProject(newProject)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-[#0F1117]">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-2 text-[#00E5B7]">Project Showcase</h1>
        <p className="text-gray-400 mb-6">Explore our exciting projects and add your own!</p>
        <Button onClick={() => setShowForm(!showForm)} className="mb-4 bg-[#9747FF] hover:bg-[#8035FF] text-white">
          {showForm ? "Hide Form" : "Add New Project"}
        </Button>
        {showForm && <AddProjectForm onAddProject={handleAddProject} onClose={() => setShowForm(false)} />}
        <ProjectList projects={projects} />
      </div>
    </div>
  )
}

