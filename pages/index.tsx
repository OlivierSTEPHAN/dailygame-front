import Head from 'next/head';
import Header from '../components/Header';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Game Guessing App</title>
        <meta name="description" content="Guess the video game based on screenshots" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center my-8">Welcome to the Game Guessing App!</h1>
        <p className="text-center">Choose a game mode to start playing.</p>
        <div className="flex justify-center mt-8">
          <div className="w-1/4">
            <Link href="/by-screenshots" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              By Screenshots
            </Link>
          </div>
          <div className="w-1/4 ml-4">
            <div className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { }}>
              🚧 By Description  🚧 ← currently working on
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
