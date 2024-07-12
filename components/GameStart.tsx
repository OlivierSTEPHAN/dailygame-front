import React from "react";
import { CoolMode } from "./ui/cool-mode";

interface GameStartProps {
  startGame: () => void;
  title: string;
  description: React.ReactNode;
}

const GameStart: React.FC<GameStartProps> = ({
  startGame,
  title,
  description,
}) => {
  return (
    <main className="flex flex-col p-2 items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <hr className="my-4"></hr>
      <div>{description}</div>
      <button
        className="mt-10 px-4 py-2 bg-green-600 text-white rounded"
        onClick={startGame}
      >
        Start
      </button>
    </main>
  );
};

export default GameStart;
