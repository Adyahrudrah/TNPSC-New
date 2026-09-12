import { ArrowRight, Eye, Upload } from "lucide-react";
import type { ChangeEvent } from "react";

interface ControlsDeckProps {
	showAnswer: () => void;
	nextQuiz: () => void;
	onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

function ControlsDeck({ showAnswer, nextQuiz, onUpload }: ControlsDeckProps) {
	return (
		<footer className="fixed bottom-0 p-2 flex">
			<label className="border-2 border-r-0 rounded-l-full p-4 group hover:bg-black transition-all cursor-pointer flex items-center justify-center m-0">
				<Upload className="group-hover:text-white" />
				<input
					type="file"
					accept=".json"
					className="hidden"
					onChange={onUpload}
				/>
			</label>
			<button
				type="button"
				className="border-2 border-r-0 p-4 group hover:bg-black transition-all"
				onClick={showAnswer}
			>
				<Eye className="group-hover:text-white" />
			</button>
			<button
				type="button"
				className="border-2 rounded-r-full p-4 group hover:bg-black transition-all"
				onClick={nextQuiz}
			>
				<ArrowRight className="group-hover:text-white" />
			</button>
		</footer>
	);
}

export default ControlsDeck;
