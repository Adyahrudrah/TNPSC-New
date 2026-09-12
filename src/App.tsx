import { useState } from "react";
import ControlsDeck from "./ControlsDeck";
import OptionsCard from "./OptionsCard";
import QuestionCard from "./QuestionCard";
import type { QuizData } from "./type";

export default function App() {
	const [quizData, setQuizData] = useState<QuizData[] | null>(null);
	const [error, setError] = useState<Error | null>(null);

	const [revealAnswer, setRevealAnswer] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const parsedData = JSON.parse(e.target?.result as string);

				if (!Array.isArray(parsedData)) {
					throw new Error(
						"Invalid JSON format. Expected an array of quiz objects.",
					);
				}

				setQuizData((prev) => {
					if (prev) {
						return [...prev, ...parsedData];
					}
					setCurrentIndex(0);
					setRevealAnswer(false);
					return parsedData;
				});

				setError(null);
			} catch (err) {
				setError(
					err instanceof Error ? err : new Error("Failed to parse JSON file"),
				);
			}
		};

		reader.onerror = () => setError(new Error("Failed to read the file"));
		reader.readAsText(file);
		event.target.value = "";
	};

	const showAnswer = () => setRevealAnswer(true);

	const nextQuiz = () => {
		if (!quizData) return;
		setRevealAnswer(false);
		setCurrentIndex((prevIndex) =>
			Math.min(quizData.length - 1, prevIndex + 1),
		);
	};

	if (!quizData || quizData.length === 0) {
		return (
			<div className="flex h-screen flex-col items-center justify-center font-tamil">
				<span className="text-lg">
					Please upload a quiz JSON file to begin.
				</span>
				<ControlsDeck
					showAnswer={showAnswer}
					nextQuiz={nextQuiz}
					onUpload={handleFileUpload}
				/>
			</div>
		);
	}

	const currentQuiz = quizData[currentIndex];

	return (
		<div className="  font-bold font-tamil flex flex-col items-center h-screen overflow-hidden">
			<div className="space-y-16 flex flex-col items-center justify-center flex-1 w-full p-16">
				{error && <p>{error.message}</p>}
				<div className="space-y-8 w-full">
					<QuestionCard quizData={currentQuiz} currentIndex={currentIndex} />
					<OptionsCard quizData={currentQuiz} revealAnswer={revealAnswer} />
				</div>
				<ControlsDeck
					showAnswer={showAnswer}
					nextQuiz={nextQuiz}
					onUpload={handleFileUpload}
				/>
			</div>
		</div>
	);
}
