import { Screenshot } from "@/model/Screenshot";
import Image from "next/image";
import React from "react";

interface GameEndProps {
  score: number[];
  correctAnswersFromServer: Screenshot | undefined;
  answers: string[];
  endGame: () => void;
}

const GameEnd: React.FC<GameEndProps> = ({
  score,
  correctAnswersFromServer,
  answers,
  endGame,
}) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold my-4">GG, try again tomorrow!</h2>
      <p>Score: {score.reduce((acc, currentValue) => acc + currentValue, 0)}</p>
      <button
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
        onClick={endGame}
      >
        Play again
      </button>
      <h3 className="text-xl font-bold my-2">Correct answers:</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
        {correctAnswersFromServer &&
          correctAnswersFromServer.name.map((name, index) => (
            <li
              key={index}
              className={`p-4 ${
                score[index] === 1 && answers[index] === name
                  ? "golden-border"
                  : score[index] === 1
                  ? "border border-green-500"
                  : "border border-red-500"
              } rounded-lg`}
            >
              <p className="font-bold">Screenshot {index + 1}</p>
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
  );
};

export default GameEnd;
