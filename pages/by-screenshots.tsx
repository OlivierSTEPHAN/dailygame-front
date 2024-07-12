import { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import {
  fetchScreenshotsUrl,
  fetchScreenshots,
  submitAnswerScreenshot,
  fetchSuggestions,
} from "../utils/api";
import { gamesList } from "@/utils/GamesList";
import GameEnd from "@/components/ByScreenshot/GameEnd";
import GamePlay from "@/components/ByScreenshot/GamePlay";
import GameStart from "@/components/GameStart";
import Layout from "@/components/Layout";
import { Screenshot } from "@/model/Screenshot";

const GAME_STATE_KEY = "screenshotGameState";

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
  const [mode, setMode] = useState<"cash" | "duo" | "square">("cash");
  const [duoAnswers, setDuoAnswers] = useState<string[]>([]);
  const [squareAnswers, setSquareAnswers] = useState<string[]>([]);

  useEffect(() => {
    fetchScreenshotsUrl().then((data) => setScreenshots(data));
    fetchScreenshots().then((data) => setCorrectAnswersFromServer(data));
    const savedState = localStorage.getItem(GAME_STATE_KEY);
    if (savedState) {
      const now = new Date();
      const currentDay = now.getDate();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
      const savedState = localStorage.getItem(GAME_STATE_KEY);
      if (savedState) {
        const { started, currentIndex, answers, score, updatedAt, mode, duoAnswers, squareAnswers } =
          JSON.parse(savedState);
        if (updatedAt === currentDate && started) {
          setStarted(started);
          setCurrentIndex(currentIndex);
          setAnswers(answers);
          setScore(score);
          setMode(mode);
          setDuoAnswers(duoAnswers);
          setSquareAnswers(squareAnswers);
        } else {
          localStorage.removeItem(GAME_STATE_KEY);
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
      mode,
      duoAnswers,
      squareAnswers
    };
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
  }, [started, currentIndex, mode]);

  const checkAnswer = async () => {
    const result = await submitAnswerScreenshot(currentIndex, input);
    setAnswers([...answers, input]);
    setScore((prevScore) => [...prevScore, computeScore(result, mode)]);
    updateStateToNewGame();
  };

  const checkAnswerWhenClicked = async (answer: string) => {
    const result = await submitAnswerScreenshot(currentIndex, answer);
    setAnswers([...answers, answer]);
    setScore((prevScore) => [...prevScore, computeScore(result, mode)]);
    updateStateToNewGame();
  };

  const updateStateToNewGame = () => {
    setCurrentIndex(currentIndex + 1);
    setInput("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setMode("cash"); // Reset mode to cash after answering

  }

  const computeScore = (isGameOk: boolean, mode: "cash" | "duo" | "square") => {
    // Si le jeu a été trouvé en cash alors 1000 points, en square 500 points, en duo 200 points, sinon 0
    if (!isGameOk) {
      return 0;
    }

    if (mode === "cash") {
      return 1000;
    } else if (mode === "duo") {
      return 200;
    } else {
      return 500;
    }

  }

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

  const handleInputClick = (selectedAnswer: string) => {
    setInput(prevInput => selectedAnswer);
    checkAnswerWhenClicked(selectedAnswer);
  }

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

  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleModeChange = (newMode: "cash" | "duo" | "square") => {
    if (mode === "cash") {
      setMode(newMode);
      // Create a duo/ square answer with the current answer a random game name from gamesList
      if (newMode === "duo") {
        const randomGame = gamesList[Math.floor(Math.random() * gamesList.length)];
        setDuoAnswers(shuffleArray([correctAnswersFromServer?.name[currentIndex]!, randomGame]));
      } else if (newMode === "square") {
        const randomGame1 = gamesList[Math.floor(Math.random() * gamesList.length)];
        const randomGame2 = gamesList[Math.floor(Math.random() * gamesList.length)];
        const randomGame3 = gamesList[Math.floor(Math.random() * gamesList.length)];
        setSquareAnswers(shuffleArray([
          correctAnswersFromServer?.name[currentIndex]!,
          randomGame1,
          randomGame2,
          randomGame3,
        ]));
      }

    }
  };

  return (
    <Layout title={"By Screenshot"}>
      <div className="text-left">
        {!started ? (
          <GameStart
            startGame={startGame}
            title="Guess the Game by Screenshots"
            description={
              <>
                <p>Each screenshot correspond to a game, find all the game names and you win!</p>
                <p>You can use the suggestions to help you.</p>
                <br />
                <p>There are 3 game modes :</p>
                <ul>
                  <li><u>Cash</u> - Enter the game name</li>
                  <li><u>Duo</u> - Choose between two game names</li>
                  <li><u>Square</u> - Choose between four game names</li>
                </ul>
              </>
            }
          />
        ) : (
          <>
            {screenshots.length > 0 && currentIndex < screenshots.length ? (
              <GamePlay
                mode={mode}
                handleModeChange={handleModeChange}
                duoAnswers={duoAnswers}
                squareAnswers={squareAnswers}
                screenshots={screenshots}
                currentIndex={currentIndex}
                input={input}
                handleInputChange={handleInputChange}
                handleInputClick={handleInputClick}
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
                correctAnswersFromServer={correctAnswersFromServer}
                answers={answers}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ByScreenshots;
