// ByScreenshots.tsx

import { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import Header from "../components/Header";
import debounce from "lodash.debounce";
import {
  fetchScreenshotsUrl,
  fetchScreenshots,
  submitAnswer,
  fetchSuggestions,
} from "../utils/api";
import GameEnd from "@/components/ByScreenshot/GameEnd";
import GamePlay from "@/components/ByScreenshot/GamePlay";
import GameStart from "@/components/ByScreenshot/GameStart";
import Layout from "@/components/Layout";

type Screenshot = {
  name: string[];
  url: string[];
};

const ByScreenshots: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswersFromServer, setCorrectAnswersFromServer] =
    useState<Screenshot>();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [score, setScore] = useState<number[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    fetchScreenshotsUrl().then((data) => setScreenshots(data));
    fetchScreenshots().then((data) => setCorrectAnswersFromServer(data));
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
      const now = new Date();
      const currentDay = now.getDate();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
      const savedState = localStorage.getItem("gameState");
      if (savedState) {
        const { started, currentIndex, answers, score, updatedAt } =
          JSON.parse(savedState);
        if (updatedAt === currentDate && started) {
          setStarted(started);
          setCurrentIndex(currentIndex);
          setAnswers(answers);
          setScore(score);
        } else {
          localStorage.removeItem("gameState");
        }
      }
    }
  }, []);

  useEffect(() => {
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    const gameState = {
      started,
      currentIndex,
      answers,
      score,
      updatedAt: currentDate,
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [started, currentIndex]);

  const checkAnswer = async () => {
    const result = await submitAnswer(currentIndex, input);
    setAnswers([...answers, input]);
    setScore((prevScore) => [...prevScore, result ? 1 : 0]);
    setCurrentIndex(currentIndex + 1);
    setInput("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
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

  const startGame = () => {
    setStarted(true);
    setCurrentIndex(0);
    setScore([]);
    setAnswers([]);
  };

  const endGame = () => {
    setStarted(false);
    setCurrentIndex(0);
    setScore([]);
    setAnswers([]);
  };

  return (
    <Layout title={"By Screenshot"}>
      <main className="container mx-auto p-4">
        {!started ? (
          <GameStart startGame={startGame} />
        ) : (
          <div className="text-center">
            {screenshots.length > 0 && currentIndex < screenshots.length ? (
              <GamePlay
                screenshots={screenshots}
                currentIndex={currentIndex}
                input={input}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
                checkAnswer={checkAnswer}
                suggestions={suggestions}
                showSuggestions={showSuggestions}
                suggestionsRef={suggestionsRef}
                selectedIndex={selectedIndex}
                setInput={setInput}
                setShowSuggestions={setShowSuggestions}
                setSelectedIndex={setSelectedIndex}
              />
            ) : (
              <GameEnd
                score={score}
                correctAnswersFromServer={correctAnswersFromServer!}
                answers={answers}
                endGame={endGame}
              />
            )}
          </div>
        )}
      </main>
    </Layout>
  );
};

export default ByScreenshots;
