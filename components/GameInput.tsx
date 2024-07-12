import React from "react";
import SuggestionsList from "./SuggestionList";

interface GameInputProps {
  mode: "cash" | "duo" | "square";
  duoAnswers: string[];
  squareAnswers: string[];
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
  handleInputClick: (answer: string) => void;
  checkAnswer: () => void;
}

const GameInput: React.FC<GameInputProps> = ({
  mode,
  duoAnswers,
  squareAnswers,
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
    <div className="flex w-full min-h-20 items-center space-x-2 bg-white rounded-3xl shadow-lg p-4 relative">
      {mode === "cash" && (
        <>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="p-2 rounded-full flex-grow outline-none text-black"
            placeholder="Devine le jeu"
            onFocus={() => setShowSuggestions(true)}
          />
          <button
            className="p-2 border bg-green-500 text-white rounded-full w-auto"
            onClick={checkAnswer}
          >
            VALIDER
          </button>
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
        </>
      )}

      {mode === "duo" && (
        <div className="grid grid-cols-2 gap-4 w-full">
          <button className="p-1 border bg-green-500 text-white rounded-md w-full" onClick={() => handleInputClick(duoAnswers[0])}>{duoAnswers[0]}</button>
          <button className="p-1 border bg-green-500 text-white rounded-md w-full" onClick={() => handleInputClick(duoAnswers[1])}>{duoAnswers[1]}</button>
        </div>
      )}

      {mode === "square" && (
        <div className="grid grid-cols-2 gap-4 w-full px-4">
          <button className="p-1 border bg-green-500 text-white rounded-md w-full" onClick={() => handleInputClick(squareAnswers[0])}>{squareAnswers[0]}</button>
          <button className="p-1 border bg-green-500 text-white rounded-md w-full" onClick={() => handleInputClick(squareAnswers[1])}>{squareAnswers[1]}</button>
          <button className="p-1 border bg-green-500 text-white rounded-md w-full" onClick={() => handleInputClick(squareAnswers[2])}>{squareAnswers[2]}</button>
          <button className="p-1 border bg-green-500 text-white rounded-md w-full" onClick={() => handleInputClick(squareAnswers[3])}>{squareAnswers[3]}</button>
        </div>
      )}
    </div>
  );
};

export default GameInput;
