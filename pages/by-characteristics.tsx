import Table from "@/components/ByCharacteristics/Table";
import GameInput from "@/components/GameInput";
import GameStart from "@/components/GameStart";
import Layout from "@/components/Layout";
import { Characteristics } from "@/model/Characteristics";
import {
  fetchSuggestions,
  submitAnswerCharacteristics,
  fetchCharacteristics,
} from "@/utils/api";
import { compareGame } from "@/utils/comparator";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useRef, useState } from "react";

const GAME_STATE_KEY = "characteristicsGameState";

function ByCharacteristics() {
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [win, setWin] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<Characteristics>();
  const [answers, setAnswers] = useState<Characteristics[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    fetchCharacteristics().then((data) => setCorrectAnswer(data));
    const savedState = localStorage.getItem(GAME_STATE_KEY);
    if (savedState) {
      const now = new Date();
      const currentDay = now.getDate();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
      const savedState = localStorage.getItem(GAME_STATE_KEY);
      if (savedState) {
        const { started, answers, updatedAt } = JSON.parse(savedState);
        if (updatedAt === currentDate && started) {
          setStarted(started);
          setAnswers(answers);
        } else {
          localStorage.removeItem(GAME_STATE_KEY);
        }
      }
    }
  }, []);

  const startGame = () => {
    setStarted(true);
    setWin(false);
    setAnswers([]);
  };

  const checkAnswer = async () => {
    const answer = input.trim();
    if (answer === "") {
      return;
    }
    const result = await submitAnswerCharacteristics(answer);
    console.log(result);
    if (result != undefined) {
      setAnswers((prevAnswers) => [...prevAnswers, result]);
      if (compareGame(result, correctAnswer!)) {
        setWin(true);
      }
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce((query: string) => {
      fetchSuggestions(query).then((data) => setSuggestions(data));
      setShowSuggestions(true);
    }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    debouncedFetchSuggestions(e.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        setInput(suggestions[selectedIndex]);
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }
  };

  const getHighlightedClass = (correctValue: any, guessedValue: any) => {
    if (Array.isArray(correctValue) && Array.isArray(guessedValue)) {
      return guessedValue.some((value) => correctValue.includes(value))
        ? "text-green-500"
        : "";
    }
    return correctValue === guessedValue ? "text-green-500" : "";
  };

  const renderYearComparison = (correctYear: number, guessedYear: number) => {
    if (guessedYear < correctYear) {
      return <span className="text-red-500">↑ {guessedYear}</span>;
    } else if (guessedYear > correctYear) {
      return <span className="text-red-500">↓ {guessedYear}</span>;
    } else {
      return <span className="text-green-500">{guessedYear}</span>;
    }
  };

  return (
    <Layout title={"By characteristics"}>
      <main className="container mx-auto p-4">
        {!started ? (
          <GameStart
            startGame={startGame}
            title="Guess the Game by Characteristics"
            description="A random game is selected and you have to guess the game by its characteristics."
          />
        ) : (
          <div className="text-center">
            <GameInput
              input={input}
              selectedIndex={selectedIndex}
              suggestions={suggestions}
              showSuggestions={showSuggestions}
              suggestionsRef={suggestionsRef}
              setInput={setInput}
              setShowSuggestions={setShowSuggestions}
              setSelectedIndex={setSelectedIndex}
              handleKeyDown={handleKeyDown}
              handleInputChange={handleInputChange}
              checkAnswer={checkAnswer}
            />
            <Table
              answers={answers}
              correctAnswer={correctAnswer}
              getHighlightedClass={getHighlightedClass}
              renderYearComparison={renderYearComparison}
            />
          </div>
        )}
      </main>
    </Layout>
  );
}

export default ByCharacteristics;
