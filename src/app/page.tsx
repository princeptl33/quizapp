"use client"

import { useState, useEffect } from "react"
import { QuestionCard } from "@/components/QuestionCard"
import { ResultCard } from "@/components/ResultCard"
import { Question } from "@/types/types"
import { decodeHtmlEntities, shuffleOptions } from "@/utils/utils"

export default function Home() {
  // State to hold the list of questions fetched from the API
  const [questions, setQuestions] = useState<Question[]>([])
  
  // State to track the index of the current question being displayed
  const [currentQuestion, setCurrentQuestion] = useState(0)
  
  // State to track which option the user has selected
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  
  // State to track if the selected answer is correct or not
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
  
  // State to keep track of the user's total score
  const [score, setScore] = useState(0)
  
  // State to track if the user has submitted their answer for the current question
  const [hasSubmitted, setHasSubmitted] = useState(false)
  
  // State to track whether the app is still loading the questions
  const [loading, setLoading] = useState(true)

  // Fetch questions from the API when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch the questions from the Open Trivia Database API
        const response = await fetch("https://opentdb.com/api.php?amount=10")
        const data = await response.json()

        // Format the questions to include the question, shuffled options, correct answer, and difficulty
        const formattedQuestions = data.results.map((question) => ({
          question: decodeHtmlEntities(question.question), // Decode HTML entities in question text
          options: shuffleOptions([question.correct_answer, ...question.incorrect_answers]), // Shuffle correct and incorrect answers
          correctAnswer: question.correct_answer, // Store the correct answer
          difficulty: question.difficulty, // Store the difficulty level of the question
        }))

        // Set the fetched and formatted questions in the state
        setQuestions(formattedQuestions)

        // Set loading to false once questions are loaded
        setLoading(false)
      } catch (error) {
        console.error("Error fetching questions:", error)
      }
    }

    fetchQuestions()
  }, [])
  
  // Handle when the user selects an option for the current question
  const handleOptionSelect = (index: number) => {
    if (!hasSubmitted) {
      // Only allow selection if the question hasn't been submitted
      setSelectedOption(index)
    }
  }

  // Handle the submission of the selected answer
  const handleSubmit = () => {
    if (selectedOption === null) return // If no option is selected, return early

    // Get the selected answer based on the selected option index
    const selectedAnswer = questions[currentQuestion].options[selectedOption]
    
    // Check if the selected answer matches the correct answer
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer
    
    // Set the result of whether the answer is correct or not
    setIsAnswerCorrect(isCorrect)

    // Mark the question as submitted
    setHasSubmitted(true)

    // If the answer is correct, increase the score
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1)
    }
  }

  // Handle moving to the next question
  const handleNextQuestion = () => {
    // Reset the selection and submission states for the next question
    setSelectedOption(null)
    setIsAnswerCorrect(null)
    setHasSubmitted(false)

    // Move to the next question
    setCurrentQuestion((prev) => prev + 1)
  }

  // Show a loading screen while the questions are being fetched
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      {/* If the current question index is within bounds, show the question card, else show the result card */}
      {currentQuestion < questions.length ? (
        <QuestionCard
          question={questions[currentQuestion]} // Pass the current question
          selectedOption={selectedOption} // Pass the selected option
          isAnswerCorrect={isAnswerCorrect} // Pass whether the answer is correct
          hasSubmitted={hasSubmitted} // Pass if the user has submitted the answer
          onSelectOption={handleOptionSelect} // Function to handle option selection
          onSubmit={handleSubmit} // Function to handle submission
          onNext={handleNextQuestion} // Function to move to the next question
        />
      ) : (
        <ResultCard score={score} totalQuestions={questions.length} /> // Show the final score after all questions are answered
      )}
    </div>
  )
}
