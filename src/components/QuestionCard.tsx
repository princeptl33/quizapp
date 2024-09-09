import { Button } from "@/components/ui/button"

// Define the props type for QuestionCard component
type QuestionCardProps = {
  question: {
    question: string;  // The actual question text
    options: string[]; // Array of answer options
    correctAnswer: string; // The correct answer
    difficulty: string; // Difficulty level of the question
  };
  selectedOption: number | null; // Currently selected option index
  isAnswerCorrect: boolean | null; // Whether the submitted answer is correct
  hasSubmitted: boolean; // Whether the user has submitted their answer
  onSelectOption: (index: number) => void; // Function to handle option selection
  onSubmit: () => void; // Function to handle answer submission
  onNext: () => void; // Function to move to the next question
};

export const QuestionCard = ({
  question,           // Question details (text, options, correct answer, difficulty)
  selectedOption,     // Currently selected option index
  isAnswerCorrect,    // Whether the answer is correct or not
  hasSubmitted,       // Whether the answer has been submitted
  onSelectOption,     // Function to handle option selection
  onSubmit,           // Function to handle submission
  onNext,             // Function to go to the next question
}: QuestionCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-md">
      {/* Display the question and difficulty badge */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{question.question}</h2>
        {/* Display the difficulty badge with dynamic colors based on difficulty */}
        <span className={`badge px-3 py-2 rounded-lg font-semibold ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)} {/* Capitalize the difficulty level */}
        </span>
      </div>

      {/* Display the options for the question */}
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <Button
            key={index}
            // Set the button style based on the current state (submitted, selected, or normal)
            variant={
              hasSubmitted
                ? option === question.correctAnswer // Highlight correct answer in green after submission
                  ? "primary" // Correct answer
                  : index === selectedOption // Highlight incorrect selected answer in red
                  ? "danger" // Incorrect answer
                  : "outline" // Other unselected options
                : selectedOption === index // Highlight selected option before submission
                ? "secondary" // Selected option (before submission)
                : "outline" // Unselected option
            }
            onClick={() => onSelectOption(index)} // Handle the selection of an option
            className="w-full justify-start"
          >
            {option} {/* Display the option text */}
          </Button>
        ))}
      </div>

      {/* Render the Submit and Next buttons */}
      <div className="mt-4 flex justify-between">
        {/* Submit button: disabled if no option is selected or answer has already been submitted */}
        <Button onClick={onSubmit} disabled={selectedOption === null || hasSubmitted} className="w-24">
          Submit
        </Button>
        {/* Next button: disabled if the answer hasn't been submitted yet */}
        <Button onClick={onNext} disabled={!hasSubmitted} className="w-24">
          Next
        </Button>
      </div>
    </div>
  );
};

// Helper function to get the color class based on the difficulty level
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "bg-green-500 text-white"; // Green for easy
    case "medium":
      return "bg-yellow-500 text-white"; // Yellow for medium
    case "hard":
      return "bg-red-500 text-white"; // Red for hard
    default:
      return "bg-gray-500 text-white"; // Gray for unknown or default
  }
};
