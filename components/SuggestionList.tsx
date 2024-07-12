import { useRouter } from "next/router";
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

  const router = useRouter();
  const isByScreenshotsPage = router.pathname === "/by-screenshots";

  return (

    <div
      ref={suggestionsRef}
      className={`absolute top-0 left-0 w-3/4 bg-white border border-gray-300 rounded-t-none rounded-b z-10 max-h-30 overflow-y-auto ${isByScreenshotsPage ? "-translate-y-full" : "translate-y-16"}`}
    >
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className={`p-2 cursor-pointer text-black ${index === selectedIndex ? "bg-gray-200" : ""
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
