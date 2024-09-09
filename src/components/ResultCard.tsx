import { Button } from "@/components/ui/button"

// Define the Props interface for the ResultCard component
interface Props {
  score: number;            // The user's score (number of correct answers)
  totalQuestions: number;   // The total number of questions in the quiz
}

// Functional component that displays the quiz results
export const ResultCard: React.FC<Props> = ({ score, totalQuestions }) => (
  <div className="flex flex-col items-center justify-center h-full">
    {/* Display the result title */}
    <h2 className="text-4xl font-bold mb-4">Results</h2>

    {/* Display the total number of questions */}
    <p className="text-2xl mb-2">Total Questions: {totalQuestions}</p>

    {/* Display the number of correct answers */}
    <p className="text-2xl mb-2">Correct Answers: {score}</p>

    {/* Display the number of incorrect answers (calculated by subtracting score from total questions) */}
    <p className="text-2xl mb-4">Incorrect Answers: {totalQuestions - score}</p>

    {/* Button to restart the quiz by reloading the page */}
    <Button onClick={() => window.location.reload()}>Restart Quiz</Button>
  </div>
)
