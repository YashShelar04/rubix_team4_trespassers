"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Check,
  X,
} from "lucide-react";

// Types for the project data
interface Feature {
  name: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  screenshots: string[];
  hackathon?: string;
  type: string;
  description: string;
  technologies: string[];
  features: Feature[];
  link: string;
}

// Simulated function to fetch project data
const getProjectById = (id: string): Project | undefined => {
  const projects: Project[] = [
    {
      id: "1",
      name: "AI Chat Interface",
      screenshots: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"],
      hackathon: "AI Innovate 2024",
      type: "Hackathon Project",
      description:
        "An advanced AI-powered chat interface that uses natural language processing to provide intelligent responses.",
      technologies: ["React", "Node.js", "OpenAI API"],
      features: [
        { name: "Real-time chat", description: "Instant messaging with AI" },
        { name: "Context awareness", description: "AI remembers conversation history" },
        { name: "Multi-language support", description: "Communicate in various languages" },
      ],
      link: "https://github.com/example/ai-chat",
    },
  ];
  return projects.find((project) => project.id === id);
};

const ProjectPage: React.FC = () => {
  const { id } = useParams() as { id: string }; // Ensure `id` is typed
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      const fetchedProject = getProjectById(id);
      setProject(fetchedProject || null);
      setEditedProject(fetchedProject || null);
    }
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === project.screenshots.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? project.screenshots.length - 1 : prevIndex - 1));
  };

  const handleSaveChanges = () => {
    if (editedProject) {
      setProject(editedProject);
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <Card className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            {isEditing && editedProject ? (
              <Input
                value={editedProject.name}
                onChange={(e) => setEditedProject({ ...editedProject, name: e.target.value })}
                className="text-2xl font-bold bg-gray-700/50 border-cyan-400 focus:ring-cyan-400"
              />
            ) : (
              project.name
            )}
          </CardTitle>
          <div className="flex space-x-2">
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
                Edit Project
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full max-w-2xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={project.screenshots[currentImageIndex] || "/placeholder.svg"}
                alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
            <Button variant="ghost" className="absolute top-1/2 left-2 transform -translate-y-1/2" onClick={prevImage}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="absolute top-1/2 right-2 transform -translate-y-1/2" onClick={nextImage}>
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex justify-center space-x-2">
            {project.screenshots.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-cyan-400" : "bg-gray-600"}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>

          {/* Project Info and Editable Fields */}
          {/* Implement similar editable logic for other fields as demonstrated above */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectPage;
