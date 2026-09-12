import { Check, Circle } from "lucide-react";
import type { QuizData } from "./type";

interface OptionsCardProps {
	quizData: QuizData;
	revealAnswer: boolean;
}

function OptionsCard({ quizData, revealAnswer }: OptionsCardProps) {
	return (
		<div
			key={JSON.stringify(quizData.options)}
			className="space-y-4 ml-16 w-full"
		>
			{Object.entries(quizData.options).map(([key, value], index) => (
				<div
					key={key}
					className="flex gap-4 text-3xl animate-stagger"
					style={{ animationDelay: `${index * 120}ms` }}
				>
					<span className="uppercase">({key})</span>
					<div className="flex gap-2 items-center justify-center">
						<p
							className={`${quizData.answer === key && revealAnswer ? "text-red-500" : ""}`}
						>
							{value as string}
						</p>
						{quizData.answer === key && revealAnswer ? (
							<Check className="text-red-500 " />
						) : (
							<Circle className="text-transparent" />
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default OptionsCard;
