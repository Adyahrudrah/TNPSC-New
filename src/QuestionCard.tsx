import type { QuizData } from "./type";

interface QuestionCardProps {
	quizData: QuizData;
	currentIndex: number;
}
function QuestionCard({ quizData, currentIndex }: QuestionCardProps) {
	return (
		<div className="text-4xl">
			<p
				key={currentIndex}
				className="flex justify-center items-start gap-4 animate-stagger"
			>
				<span>{currentIndex + 1}.</span>
				<span>{quizData.question}</span>
			</p>
		</div>
	);
}

export default QuestionCard;
