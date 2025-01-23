import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

interface Project {
  id: string
  title: string
  description: string
  image: string
  email: string
  cost: number
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full bg-card border-0 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-white">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <p className="text-sm text-gray-400 mb-2">{project.description}</p>
        <p className="text-sm text-gray-400 mb-2">{project.email}</p>
      </CardContent>
      <CardFooter>
        <p className="font-bold text-lg text-[#FFB800]">${project.cost.toFixed(2)}</p>
      </CardFooter>
    </Card>
  )
}

