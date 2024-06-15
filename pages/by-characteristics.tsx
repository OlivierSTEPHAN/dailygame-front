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
      return <span className="text-red-500">↓ {guessedYear}</span>;
    } else if (guessedYear > correctYear) {
      return <span className="text-red-500">↑ {guessedYear}</span>;
    } else {
      return <span className="text-green-500">{guessedYear}</span>;
    }
  };

  const renderTable = (
    answers: Characteristics[],
    correctAnswer: Characteristics
  ) => {
    return (
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Genres</th>
              <th className="px-4 py-2">POV</th>
              <th className="px-4 py-2">Franchises</th>
              <th className="px-4 py-2">Companies</th>
              <th className="px-4 py-2">Platforms</th>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Game Modes</th>
              <th className="px-4 py-2">Game Engines</th>
            </tr>
          </thead>
          <tbody>
            {answers.length != 0 ??
              answers.map((answer, index) => (
                <tr key={index}>
                  <td className="border px-4 py-1">{index + 1}</td>
                  <td
                    className={`border px-4 py-1 ${getHighlightedClass(
                      correctAnswer.name,
                      answer.name
                    )}`}
                  >
                    {answer.name || "-"}
                  </td>
                  <td className="border px-4 py-1">
                    {answer.genres.length > 0
                      ? answer.genres.map((genre) => (
                          <span
                            key={genre}
                            className={getHighlightedClass(
                              correctAnswer.genres,
                              [genre]
                            )}
                          >
                            {genre}{" "}
                          </span>
                        ))
                      : "-"}
                  </td>
                  <td className="border px-4 py-1">
                    {answer.pov.length > 0
                      ? answer.pov.map((pov) => (
                          <span
                            key={pov}
                            className={getHighlightedClass(correctAnswer.pov, [
                              pov,
                            ])}
                          >
                            {pov}{" "}
                          </span>
                        ))
                      : "-"}
                  </td>
                  <td className="border px-4 py-1">
                    {answer.franchises.length > 0
                      ? answer.franchises.map((franchise) => (
                          <span
                            key={franchise}
                            className={getHighlightedClass(
                              correctAnswer.franchises,
                              [franchise]
                            )}
                          >
                            {franchise}{" "}
                          </span>
                        ))
                      : "-"}
                  </td>
                  <td className="border px-4 py-1">
                    {answer.companiesName.length > 0
                      ? answer.companiesName.map((company) => (
                          <span
                            key={company}
                            className={getHighlightedClass(
                              correctAnswer.companiesName,
                              [company]
                            )}
                          >
                            {company}{" "}
                          </span>
                        ))
                      : "-"}
                  </td>
                  <td className="border px-4 py-1">
                    {answer.platforms.length > 0
                      ? answer.platforms.map((platform) => (
                          <span
                            key={platform}
                            className={getHighlightedClass(
                              correctAnswer.platforms,
                              [platform]
                            )}
                          >
                            {platform}{" "}
                          </span>
                        ))
                      : "-"}
                  </td>
                  <td className="border px-4 py-1">
                    {answer.year
                      ? renderYearComparison(correctAnswer.year, answer.year)
                      : "-"}
                  </td>
                  <td className="border px-4 py-1">
                    {answer.gameModes.length > 0
                      ? answer.gameModes.map((gameMode) => (
                          <span
                            key={gameMode}
                            className={getHighlightedClass(
                              correctAnswer.gameModes,
                              [gameMode]
                            )}
                          >
                            {gameMode}{" "}
                          </span>
                        ))
                      : "-"}
                  </td>
                  <td className="border px-4 py-1">
                    {answer.gameEngines.length > 0
                      ? answer.gameEngines.map((gameEngine) => (
                          <span
                            key={gameEngine}
                            className={getHighlightedClass(
                              correctAnswer.gameEngines,
                              [gameEngine]
                            )}
                          >
                            {gameEngine}{" "}
                          </span>
                        ))
                      : "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
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
            {renderTable(answers, correctAnswer!)}
          </div>
        )}
      </main>
    </Layout>
  );
}

export default ByCharacteristics;
