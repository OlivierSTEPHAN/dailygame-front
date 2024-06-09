import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import debounce from 'lodash.debounce';

const ByScreenshots: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {

      // Get current date at format dd mm yyyy
      const now = new Date();
      const currentDay = now.getDate();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

      // Check if the saved state is from the current date
      const savedState = localStorage.getItem('gameState');
      if (savedState) {
        const { started, currentIndex, input, score, updatedAt } = JSON.parse(savedState);
        if (updatedAt === currentDate && started) {
          setStarted(started);
          setCurrentIndex(currentIndex);
          setInput(input);
          setScore(score);
        } else {
          // Reset the game state if it's not from the current date
          localStorage.removeItem('gameState');
        }
      }
    }
  }, []);

  useEffect(() => {
    if (started) {
      fetchScreenshots();
    }
  }, [started]);

  useEffect(() => {
    // Get current date at format dd mm yyyy
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    const gameState = { started, currentIndex, input, score, updatedAt: currentDate };
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [started, currentIndex, input, score]);

  const fetchScreenshots = async () => {
    const response = await fetch('http://193.203.190.11:8080/api/daily-games/screenshots');
    const data = await response.json();
    setScreenshots(data.screenshots);
  };

  const checkAnswer = async () => {
    const response = await fetch('http://193.203.190.11:8080/api/daily-games/screenshots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index: currentIndex, answer: input }),
    });
    const result = await response.json();
    console.log(result)
    if (result) {
      setScore(score + 1);
    }
    setCurrentIndex(currentIndex + 1);
    setInput('');
    setSuggestions([]);
  };

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) return;
    const response = await fetch(`http://193.203.190.11:8080/api/games/autocomplete?name=${query}`);
    const data = await response.json();
    setSuggestions(data);
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    debouncedFetchSuggestions(e.target.value);
  };

  const startGame = () => {
    setStarted(true);
    setCurrentIndex(0);
    setScore(0);
  };

  const endGame = () => {
    setStarted(false);
    setCurrentIndex(0);
    setScore(0);
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
            <h1 className="text-2xl font-bold my-4">Guess the Game by Screenshots</h1>
            <p>Each screenshot corresponds to a game, find all the game names and you win!</p>
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
                    <img src={screenshots[currentIndex]} alt={`Screenshot ${currentIndex + 1}`} className="object-contain w-full h-auto" />
                  </div>
                </div>
                <div className="mx-auto my-4 relative flex flex-row md:items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded w-[70%]"
                    placeholder="Enter game name"
                    list="suggestions"
                  />
                  <datalist id="suggestions" className=''>
                    {suggestions.map((suggestion, index) => (
                      <option key={index} value={suggestion} />
                    ))}
                  </datalist>
                  <button
                    className="ml-4 p-2 border bg-green-600 text-white rounded w-[30%]"
                    onClick={checkAnswer}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold my-4">Good try, try again tomorrow!</h2>
                <p>Your score: {score}</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={endGame}
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ByScreenshots;
