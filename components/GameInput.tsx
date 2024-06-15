import React from "react";
import SuggestionsList from "./SuggestionList";

interface GameInputProps {
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

const GameInput: React.FC<GameInputProps> = ({
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
  );
};

export default GameInput;
