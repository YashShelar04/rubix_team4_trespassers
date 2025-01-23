"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Play, PauseCircle, Download } from "lucide-react"
import html2pdf from 'html2pdf.js'

const questions = [
  "How innovative is the project idea?",
  "How well does the project solve the stated problem?",
  "How user-friendly is the interface?",
  "How technically sound is the implementation?",
  "How well were the presentation and demo delivered?",
  "How effectively did the team manage their time?",
  "How scalable is the solution?",
  "How practical is the solution for real-world application?",
  "How unique is the approach compared to existing solutions?",
  "How well did the team address questions from the judges?",
]

const Judge: React.FC = () => {
  const [scores, setScores] = useState<number[]>(new Array(10).fill(0))
  const [timeLeft, setTimeLeft] = useState(600)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0))
      }, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isRunning])

  const handleScoreChange = (index: number, score: number) => {
    const newScores = [...scores]
    newScores[index] = score
    setScores(newScores)
  }

  const getTimeFormatted = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const totalScore = scores.reduce((sum, score) => sum + score, 0)

  const toggleTimer = () => setIsRunning((prev) => !prev)

  const handleSaveAsPDF = () => {
    // Create a new div for PDF content
    const pdfContent = document.createElement("div")
    pdfContent.innerHTML = `
       <div style="padding: 20px; font-family: Arial, sans-serif; color: #000000;">
    <h1 style="text-align: center; color: #000080; margin-bottom: 20px;">Judging Results</h1>
    <p style="text-align: center; margin-bottom: 20px; color: #000000;">Time Remaining: ${getTimeFormatted()}</p>
    <p style="text-align: center; font-size: 24px; margin-bottom: 30px; color: #000000;">Total Score: ${totalScore}/100</p>
    <div style="margin-top: 20px;">
      ${questions
        .map(
          (question, index) => `
          <div style="margin-bottom: 15px; padding: 10px; background-color: #f0f0f0; border-radius: 8px; color: #000000;">
            <p style="margin-bottom: 8px; color: #000000;"><strong>Question ${index + 1}:</strong> ${question}</p>
            <p style="color: #000000;">Score: ${scores[index]}/10</p>
          </div>
        `,
        )
        .join("")}
    </div>
  </div>
    `

    // Configure PDF options
    const opt = {
      margin: 1,
      filename: "judging-results.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }

    // Generate PDF
    html2pdf().from(pdfContent).set(opt).save()
  }

  return (
    <div className="p-6 bg-gray-800 text-white rounded-md shadow-lg">
      <div className="flex w-full justify-center">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Judging Panel
          </h1>

          {/* Timer */}
          <div className="mb-2 text-center">
            <h2 className="text-lg font-semibold">Time Remaining</h2>
            <p className="text-3xl font-bold">{getTimeFormatted()}</p>
          </div>

          {/* Timer Controls */}
          <div className="flex space-x-4 justify-center mb-6">
            <button
              onClick={toggleTimer}
              className={`flex items-center justify-center px-4 py-2 rounded-md ${
                isRunning ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
              }`}
              aria-label={isRunning ? "Pause Timer" : "Resume Timer"}
            >
              {isRunning ? <PauseCircle className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Questions and Scoring */}
      <div className="flex w-full justify-center">
        <div className="space-y-4 min-w-[50%] flex-col items-center justify-center">
          {questions.map((question, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-md text-center">
              <h3 className="text-lg">{question}</h3>
              <div className="flex space-x-2 mt-2 justify-evenly">
                {Array.from({ length: 10 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handleScoreChange(index, i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md ${
                      scores[index] === i + 1 ? "bg-green-500 text-white" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Total Score */}
      <div
        className="fixed top-4 right-4 flex items-center justify-center px-2 py-1 md:px-14 md:py-9 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 cursor-pointer"
        title="Total Score"
      >
        <div className="flex-col text-center">
          <div className="text-l font-bold">{`Score:`}</div>
          <div className="text-2xl font-bold">{totalScore}/100</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full justify-center gap-4">
        <button
          className="mt-4 w-[20vw] bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
          onClick={() => {
            const firstUnansweredIndex = scores.findIndex((score) => score === 0)

            if (firstUnansweredIndex !== -1) {
              document
                .querySelectorAll(".bg-gray-700")
                [firstUnansweredIndex].scrollIntoView({ behavior: "smooth", block: "center" })
              alert(`Please score question ${firstUnansweredIndex + 1}.`)
            } else {
              alert("Scores submitted!")
            }
          }}
        >
          Submit Scores
        </button>

        <button
          className="mt-4 w-[20vw] bg-purple-500 text-white py-2 px-4 rounded-full hover:bg-purple-600 flex items-center justify-center gap-2"
          onClick={handleSaveAsPDF}
        >
          <Download className="w-5 h-5" />
          Save as PDF
        </button>
      </div>
    </div>
  )
}

export default Judge

