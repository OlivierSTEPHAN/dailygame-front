import { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import Header from "../components/Header";
import debounce from "lodash.debounce";

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
    fetchScreenshotsUrl();
    fetchScreenshots();
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

  const fetchScreenshotsUrl = async () => {
    const response = await fetch(
      "https://srv541447.hstgr.cloud:8443/api/daily-games/screenshots/url"
    );
    const data = await response.json();
    setScreenshots(data.screenshots);
  };

  const fetchScreenshots = async () => {
    const response = await fetch(
      "https://srv541447.hstgr.cloud:8443/api/daily-games/screenshots"
    );
    const data = await response.json();
    setCorrectAnswersFromServer(data);
  };

  const checkAnswer = async () => {
    const response = await fetch(
      "https://srv541447.hstgr.cloud:8443/api/daily-games/screenshots",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: currentIndex, answer: input }),
      }
    );
    setAnswers([...answers, input]);
    const result = await response.json();
    setScore((prevScore) => [...prevScore, result ? 1 : 0]);
    setCurrentIndex(currentIndex + 1);
    setInput("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) return;
    const response = await fetch(
      `https://srv541447.hstgr.cloud:8443/api/games/autocomplete?name=${query}`
    );
    const data = await response.json();
    setSuggestions(data);
    setShowSuggestions(true);
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
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
    <div>
      <Head>
        <title>By Screenshots</title>
        <meta name="description" content="Guess the game by screenshots" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto p-4">
        {!started ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold my-4">
              Guess the Game by Screenshots
            </h1>
            <p>
              Each screenshot corresponds to a game, find all the game names and
              you win!
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={startGame}
            >
              Start
            </button>
          </div>
        ) : (
          <div className="text-center">
            {screenshots.length > 0 && currentIndex < screenshots.length ? (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-center">
                <div className="mx-auto my-4 max-w-full h-auto md:w-3/4 md:mr-4">
                  <div className="inline-block max-h-[70vh] max-w-full overflow-scroll">
                    <img
                      src={screenshots[currentIndex]}
                      alt={`Screenshot ${currentIndex + 1}`}
                      className="object-contain w-full h-auto"
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
                  )}
                  <button
                    className="mt-2 md:mt-0 md:ml-4 p-2 border bg-green-600 text-white rounded w-full md:w-[30%]"
                    onClick={checkAnswer}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div className="">
                <h2 className="text-2xl font-bold my-4">
                  GG, try again tomorrow !
                </h2>
                <p>
                  Score :{" "}
                  {score.reduce((acc, currentValue) => acc + currentValue, 0)}
                </p>
                <button
                  className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                  onClick={endGame}
                >
                  Play again
                </button>
                <h3 className="text-xl font-bold my-2">Correct answers :</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
                  {correctAnswersFromServer &&
                    correctAnswersFromServer.name.map((name, index) => (
                      <li
                        key={index}
                        className={`p-4 ${
                          score[index] === 1 && answers[index] === name
                            ? "golden-border"
                            : score[index] === 1
                            ? "border border-green-500"
                            : "border border-red-500"
                        } rounded-lg`}
                      >
                        <p className="font-bold">Screenshot {index + 1}</p>
                        <img
                          src={correctAnswersFromServer.url[index]}
                          alt={`Capture d'écran ${index + 1}`}
                          className="mt-2 w-full"
                        />
                        <p className="mt-2">
                          <strong>Correct answer :</strong> {name}
                        </p>
                        <p className="mt-2">
                          <strong>Your answer :</strong>{" "}
                          {answers[index] || "No answer 😢"}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ByScreenshots;
