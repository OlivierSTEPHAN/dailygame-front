import React from "react";
import SuggestionsList from "../SuggestionList";
import Image from "next/image";
import GameInput from "../GameInput";

interface GamePlayProps {
  screenshots: string[];
  currentIndex: number;
  input: string;
  selectedIndex: number;
  suggestions: string[];
  showSuggestions: boolean;
  suggestionsRef: React.RefObject<HTMLDivElement>;
  setInput: (input: string) => void;
  setShowSuggestions: (show: boolean) => void;
  setSelectedIndex: (index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkAnswer: () => void;
}

const GamePlay: React.FC<GamePlayProps> = ({
  screenshots,
  currentIndex,
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
  checkAnswer,
}) => {
  return (
    <div className="text-center">
      {screenshots.length > 0 && currentIndex < screenshots.length ? (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center">
          <div className="mx-auto my-4 max-w-full h-auto md:w-3/4 md:mr-4">
            <div className="inline-block max-h-[70vh] max-w-full">
              <Image
                src={screenshots[currentIndex]}
                alt={`Screenshot ${currentIndex + 1}`}
                className="object-contain"
                width={600}
                height={500}
              />
            </div>
          </div>
          <GameInput
            input={input}
            handleInputChange={handleInputChange}
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
      ) : null}
    </div>
  );
};

export default GamePlay;
