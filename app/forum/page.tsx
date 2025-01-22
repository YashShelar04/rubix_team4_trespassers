"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Eye, MessageSquare, ThumbsUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Question {
  id: string
  title: string
  author: {
    name: string
    avatar: string
  }
  views: number
  answers: number
  votes: number
  timestamp: string
}

const questions: Question[] = [
  {
    id: "1",
    title: "Google forms used in survey...are those forms a form of digital humanities?",
    author: {
      name: "muhlismuhamad589",
      avatar: "MM",
    },
    views: 9600,
    answers: 1,
    votes: 0,
    timestamp: "15 hours ago",
  },
  {
    id: "2",
    title: "How to create good quality essay?",
    author: {
      name: "Betty Holland",
      avatar: "BH",
    },
    views: 12130,
    answers: 8,
    votes: 1,
    timestamp: "November 13, 2024",
  },
  {
    id: "3",
    title: "How to write a Tweetable Abstract?",
    author: {
      name: "Anonymous",
      avatar: "A",
    },
    views: 13070,
    answers: 1,
    votes: 0,
    timestamp: "September 16, 2024",
  },
  {
    id: "4",
    title: 'after 3 months my paper is still "with editor," how can I submit to another journal?',
    author: {
      name: "Anonymous",
      avatar: "A",
    },
    views: 7380,
    answers: 1,
    votes: 0,
    timestamp: "June 3, 2024",
  },
  {
    id: "5",
    title: "what are the types of authorships?",
    author: {
      name: "Anonymous",
      avatar: "A",
    },
    views: 12360,
    answers: 1,
    votes: 0,
    timestamp: "May 26, 2024",
  },
]

function formatNumber(num: number): string {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num.toString()
}

export default function Forum() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Link href="/mentor-connect" className="fixed top-8 left-8 text-white hover:text-cyan-400 transition-colors duration-200">
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-green-400 to-purple-500">
          Research Questions Forum
        </h1>

        <div className="max-w-4xl mx-auto space-y-4">
          {questions.map((question) => (
            <Card
              key={question.id}
              className="bg-gray-800/50 border-none shadow-xl backdrop-blur-sm hover:bg-gray-700/50 cursor-pointer transform hover:scale-[1.02] transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border-2 border-cyan-400/20">
                    <AvatarFallback className="bg-gray-700 text-cyan-400">{question.author.avatar}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-100 mb-2 hover:text-cyan-400 transition-colors">
                      {question.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {formatNumber(question.views)} views
                      </span>
                      <span>
                        {question.author.name} answered question {question.timestamp}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <p className="text-sm font-medium text-gray-400">{question.votes}</p>
                      <p className="text-xs text-gray-500">votes</p>
                    </div>

                    <div className="text-center">
                      <div className="h-8 w-8 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-400">{question.answers}</p>
                      <p className="text-xs text-gray-500">ans</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

