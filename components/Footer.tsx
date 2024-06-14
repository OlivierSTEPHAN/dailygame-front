// components/Footer.tsx

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-auto">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex ">
          <a
            href="https://github.com/OlivierSTEPHAN"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-gray-300 hover:text-white mr-4 w-6 h-6 hover:-translate-y-1 transition-transform duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faGithubSquare} size="2x" />
          </a>
          <a
            href="https://www.linkedin.com/in/olivier-stephan-9b5077186/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-gray-300 hover:text-white  w-6 h-6 hover:-translate-y-1 transition-transform duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
        <div>
          <Link
            href="/mentions-legales"
            className="text-white text-sm hover:underline"
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
