"use client"

import { useState, useEffect } from "react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  cost: number
}

const staticProjects: Project[] = [
  {
    id: "1",
    title: "Modern Website Redesign",
    description: "Complete overhaul of a corporate website with responsive design and improved user experience.",
    image: "/placeholder.svg?height=200&width=300",
    cost: 5000,
  },
  {
    id: "2",
    title: "E-commerce Platform",
    description:
      "Development of a full-featured e-commerce platform with secure payment integration and inventory management.",
    image: "/placeholder.svg?height=200&width=300",
    cost: 8000,
  },
  {
    id: "3",
    title: "Mobile App Development",
    description: "Creation of a cross-platform mobile app for iOS and Android with real-time data synchronization.",
    image: "/placeholder.svg?height=200&width=300",
    cost: 10000,
  },
]

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects")
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects))
    } else {
      setProjects(staticProjects)
      localStorage.setItem("projects", JSON.stringify(staticProjects))
    }
  }, [])

  const addProject = (newProject: Project) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects, newProject]
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
      return updatedProjects
    })
  }

  return { projects, addProject, setProjects }
}

