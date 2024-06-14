import React from "react";

interface SuggestionsListProps {
  suggestions: string[];
  suggestionsRef: React.RefObject<HTMLDivElement>;
  selectedIndex: number;
  setInput: (input: string) => void;
  setShowSuggestions: (show: boolean) => void;
  setSelectedIndex: (index: number) => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  suggestionsRef,
  selectedIndex,
  setInput,
  setShowSuggestions,
  setSelectedIndex,
}) => {
  return (
    <div
      ref={suggestionsRef}
      className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-t-none rounded-b z-10 max-h-60 overflow-y-auto"
    >
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className={`p-2 cursor-pointer ${
            index === selectedIndex ? "bg-gray-200" : ""
          }`}
          onMouseDown={() => {
            setInput(suggestion);
            setShowSuggestions(false);
            setSelectedIndex(-1);
          }}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default SuggestionsList;
