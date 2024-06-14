import React from "react";

interface GameStartProps {
  startGame: () => void;
}

const GameStart: React.FC<GameStartProps> = ({ startGame }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold my-4">Guess the Game by Screenshots</h1>
      <p>
        Each screenshot corresponds to a game, find all the game names and you
        win!
      </p>
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
