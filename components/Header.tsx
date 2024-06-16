import { faImage, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          DailyGame
        </Link>
        <div className="flex items-center min-w-60 justify-between sm:min-w-40">
          <Link href="/" className="mr-4 hover:text-gray-300">
            Home
          </Link>
          <Link
            href="/by-screenshots"
            className="hover:text-gray-300 w-6 h-6"
            title="screenshots"
          >
            <FontAwesomeIcon icon={faImage} size="2x" className="h-full" />
          </Link>
          <Link
            href="/by-characteristics"
            className="hover:text-gray-300 w-6 h-6 "
            title="characteristics"
          >
            <FontAwesomeIcon icon={faListAlt} size="2x" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
