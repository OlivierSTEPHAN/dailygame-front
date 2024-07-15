import React from "react";
import Image from "next/image";
import GameInput from "../GameInput";
import { FaLock } from "react-icons/fa";

interface GamePlayProps {
  mode: "cash" | "duo" | "square";
  handleModeChange: (mode: "cash" | "duo" | "square") => void;
  duoAnswers: string[];
  squareAnswers: string[];
  screenshots: string[];
  currentIndex: number;
  input: string;
  timer: number;
  selectedIndex: number;
  suggestions: string[];
  showSuggestions: boolean;
  suggestionsRef: React.RefObject<HTMLDivElement>;
  setInput: (input: string) => void;
  setShowSuggestions: (show: boolean) => void;
  setSelectedIndex: (index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputClick: (answer: string) => void;
  checkAnswer: () => void;
}

const GamePlay: React.FC<GamePlayProps> = ({
  mode,
  handleModeChange,
  duoAnswers,
  squareAnswers,
  screenshots,
  currentIndex,
  timer,
  input,
  selectedIndex,
  suggestions,
  showSuggestions,
  suggestionsRef,
  setInput,
  setShowSuggestions,
  setSelectedIndex,
  handleKeyDown,
  handleInputChange,
  handleInputClick,
  checkAnswer,
}) => {
  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      {screenshots.length > 0 && currentIndex < screenshots.length ? (
        <div className="relative flex flex-col items-center justify-between h-full w-full">
          <div className="absolute z-10 top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2">
            <div className="text-xl font-semibold text-black">
              {currentIndex + 1}/{screenshots.length}
            </div>
            <div className="text-xl font-semibold text-black">
              {timer == 21 ? 20 : timer} sec
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center max-h-full max-w-full p-4">
            <Image
              src={screenshots[currentIndex]}
              alt={`Screenshot ${currentIndex + 1}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-xl px-4">
            <div className="flex justify-start pl-10 translate-y-2">
              <div
                className={`pr-2 pl-2 pt-2 pb-4 rounded-md min-w-20 cursor-pointer ${mode === "cash" ? "bg-green-500 text-white z-10 scale-105" : "bg-gray-200 text-gray-600"}`}
                onClick={() => handleModeChange("cash")}
              >
                Cash
                {(mode === "duo" || mode === "square") && <FaLock className="ml-2 inline" />}
              </div>
              <div
                className={`pr-2 pl-2 pt-2 pb-4 rounded-md min-w-20 cursor-pointer ${mode === "duo" ? "bg-green-500 text-white z-10 scale-105" : "bg-gray-200 text-gray-600"}`}
                onClick={() => handleModeChange("duo")}
              >
                Duo
                {(mode === "square") && <FaLock className="ml-2 inline" />}
              </div>
              <div
                className={`pr-2 pl-2 pt-2 pb-4 rounded-md min-w-20 cursor-pointer ${mode === "square" ? "bg-green-500 text-white z-10 scale-105" : "bg-gray-200 text-gray-600"}`}
                onClick={() => handleModeChange("square")}
              >
                Square
                {(mode === "duo") && <FaLock className="ml-2 inline" />}
              </div>
            </div>
            <GameInput
              mode={mode}
              duoAnswers={duoAnswers}
              squareAnswers={squareAnswers}
              input={input}
              handleInputChange={handleInputChange}
              handleInputClick={handleInputClick}
              handleKeyDown={handleKeyDown}
              showSuggestions={showSuggestions}
              suggestions={suggestions}
              suggestionsRef={suggestionsRef}
              selectedIndex={selectedIndex}
              setInput={setInput}
              setShowSuggestions={setShowSuggestions}
              setSelectedIndex={setSelectedIndex}
              checkAnswer={checkAnswer}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GamePlay;
