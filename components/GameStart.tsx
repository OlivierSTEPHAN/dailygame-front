import React from "react";

interface GameStartProps {
  startGame: () => void;
  title: string;
  description: string;
}

const GameStart: React.FC<GameStartProps> = ({
  startGame,
  title,
  description,
}) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold my-4">{title}</h1>
      <p>{description}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={startGame}
      >
        Start
      </button>
    </div>
  );
};

export default GameStart;
