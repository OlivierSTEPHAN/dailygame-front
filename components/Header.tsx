import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <nav className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">
          DailyGame Guessing App
        </Link>
        <div>
          <Link href="/" className="mr-4">
            Home
          </Link>
          <Link href="/by-screenshots">
            By Screenshots
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
