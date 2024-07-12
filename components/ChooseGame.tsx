import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import WordPullUp from "./ui/word-pull-up";

function GameSelection() {
  return (
    <div className="flex flex-col items-center h-screen p-4">
      <WordPullUp words={"Welcome to DailyGame!"} className="text-white" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}>
        <h2 className="text-xl text-center text-white mt-5">
          The game guessing app, each day you&apos;ll have new games to find!
        </h2>
      </motion.div>
      <p className="text-center text-xl italic text-white mt-10">Choose a game mode to start playing.</p>
      <div className="flex flex-row justify-center mt-4 space-x-4 w-full max-w-5xl">
        <motion.div initial={{ x: -700, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5, delay: 0.6 }} className="flex flex-col bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-4 items-center w-1/2">
          <h2 className="text-center text-2xl font-semibold text-white">Screenshot</h2>
          <Image src="/screenshot.webp" alt="Screenshot" width={200} height={200} className="m-8 rounded-lg" />
          <Link href="/by-screenshots">
            <button className="bg-green-500 text-white font-bold py-3 px-4 rounded-md shadow-md hover:bg-green-700 hover:shadow-lg hover:scale-105 transition">
              Find the games
            </button>
          </Link>
        </motion.div>

        <motion.div initial={{ x: 700, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5, delay: 1.1 }} className="flex flex-col bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-4 items-center w-1/2">
          <h2 className="text-center text-2xl font-semibold text-white">Characteristics</h2>
          <Image src="/characteristic.webp" alt="Characteristic" width={200} height={200} className="m-8 rounded-lg" />
          <Link href="/by-characteristics">
            <button className="bg-green-500 text-white font-bold py-3 px-4 rounded-md shadow-md hover:bg-green-700 hover:shadow-lg hover:scale-105 transition">
              Find the game
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default GameSelection;
