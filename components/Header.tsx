import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          DailyGame Guessing App
        </Link>
        <div className="flex items-center">
          <Link href="/" className="mr-4 hover:text-gray-300">
            Home
          </Link>
          <Link href="/by-screenshots" className="hover:text-gray-300">
            By Screenshots
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
