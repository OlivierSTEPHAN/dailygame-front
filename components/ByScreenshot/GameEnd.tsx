import { Screenshot } from "@/model/Screenshot";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from 'react-toastify';

interface GameEndProps {
  score: number[];
  correctAnswersFromServer: Screenshot | undefined;
  answers: string[];
}

const GameEnd: React.FC<GameEndProps> = ({
  score,
  correctAnswersFromServer,
  answers,
}) => {

  const computeBorderColor = (score: number) => {
    if (score === 1000) {
      return "border-green-500";
    } else if (score === 500) {
      return "border-yellow-500";
    }
    else if (score === 200) {
      return "border-orange-500";
    }
    else {
      return "border-red-500";
    }
  }

  const copyResultsToClipboard = () => {
    const totalScore = score.reduce((acc, currentValue) => acc + currentValue, 0);
    // Add "DailyGame" and the current date formatted dd/mm
    const formattedResults =
      `DailyGame - ${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}\n` +
      `Total Score: ${totalScore}\n` +
      score.map((s, index) => `${index + 1} - ${s}`).join('\n');

    navigator.clipboard.writeText(formattedResults).then(() => {
      toast.success("Results copied to clipboard!");
    });
  };

  return (
    <>
      <Link href="/" className="p-4 text-xl hover:underline hover:scale-105">
        ← Back to DailyGame
      </Link>
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold my-4">GG, try again tomorrow!</h2>
        <p>Score: {score.reduce((acc, currentValue) => acc + currentValue, 0)}</p>
        <button
          className="mt-8 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out"
          onClick={copyResultsToClipboard}
        >
          Copy score to clipboard
        </button>
        <h3 className="text-xl font-bold mt-8 mb-4">Correct answers:</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
          {correctAnswersFromServer &&
            correctAnswersFromServer.name.map((name, index) => (
              <li
                key={index}
                className={`p-4 border ${computeBorderColor(score[index])} border-2 rounded-lg`}
              >
                <p className="font-bold">Screenshot {index + 1}</p>
                <p> Score : {score[index]}</p>
                <Image
                  src={correctAnswersFromServer.url[index]}
                  alt={`Capture d'écran ${index + 1}`}
                  className="mt-2"
                  width={400}
                  height={300}
                />
                <p className="mt-2">
                  <strong>Correct answer :</strong> {name}
                </p>
                <p className="mt-2">
                  <strong>Your answer :</strong>{" "}
                  {answers[index] || "No answer 😢"}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </>

  );
};

export default GameEnd;
