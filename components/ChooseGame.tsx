import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import WordPullUp from "./ui/word-pull-up";
import ShimmerButton from "./ui/shimmer-button";

function ChooseGame() {
  return (
    <div className="flex flex-col justify-start h-full m-4">
      <WordPullUp words={"Welcome to the Game Guessing App!"} />
      <p className="text-center">Choose a game mode to start playing.</p>
      <div className="flex flex-wrap justify-center mt-8">
        <motion.div
          className="w-full mr-2 md:w-1/2 lg:w-1/4 mb-4 md:pr-2"
          initial={{ x: -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 1 } }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href="/by-screenshots"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center"
          >
            By Screenshots
          </Link>
        </motion.div>
        <motion.div
          className="w-full ml-2 md:w-1/2 lg:w-1/4 mb-4 md:pl-2"
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 1.1 } }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href="/by-characteristics"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center"
          >
            By Characteristics
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default ChooseGame;
