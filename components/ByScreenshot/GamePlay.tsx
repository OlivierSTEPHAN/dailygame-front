import React from "react";
import SuggestionsList from "../SuggestionList";
import Image from "next/image";

interface GamePlayProps {
  screenshots: string[];
  currentIndex: number;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  checkAnswer: () => void;
  suggestions: string[];
  showSuggestions: boolean;
  suggestionsRef: React.RefObject<HTMLDivElement>;
  selectedIndex: number;
  setInput: (input: string) => void;
  setShowSuggestions: (show: boolean) => void;
  setSelectedIndex: (index: number) => void;
}

const GamePlay: React.FC<GamePlayProps> = ({
  screenshots,
  currentIndex,
  input,
  handleInputChange,
  handleKeyDown,
  checkAnswer,
  suggestions,
  showSuggestions,
  suggestionsRef,
  selectedIndex,
  setInput,
  setShowSuggestions,
  setSelectedIndex,
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
          <div className="mx-auto my-4 relative flex flex-col w-full md:flex-row md:items-center">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="p-2 border border-gray-300 rounded w-full md:w-[70%]"
              placeholder="Enter game name"
              onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <SuggestionsList
                suggestions={suggestions}
                suggestionsRef={suggestionsRef}
                selectedIndex={selectedIndex}
                setInput={setInput}
                setShowSuggestions={setShowSuggestions}
                setSelectedIndex={setSelectedIndex}
              />
            )}
            <button
              className="mt-2 md:mt-0 md:ml-4 p-2 border bg-green-600 text-white rounded w-full md:w-[30%]"
              onClick={checkAnswer}
            >
              Submit
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GamePlay;
