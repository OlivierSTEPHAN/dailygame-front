import React from "react";
import Head from "next/head";
import { motion, useCycle } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, description, children }) => {
  const [animate, cycleAnimate] = useCycle(
    { background: "linear-gradient(90deg, #6b46c1, #4c51bf)" },  // Horizontal
    { background: "linear-gradient(180deg, #6b46c1, #4c51bf)" }, // Vertical
    { background: "linear-gradient(45deg, #6b46c1, #4c51bf)" },  // Diagonal
    { background: "linear-gradient(135deg, #6b46c1, #4c51bf)" }  // Opposite Diagonal
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      cycleAnimate();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [cycleAnimate]);

  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col min-h-screen justify-between overflow-hidden"
      animate={animate}
      transition={{ duration: 5 }}
    >
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
        {description && <meta name="description" content={description} />}

        {/* Responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Charset meta tag */}
        <meta charSet="utf-8" />
        {/* Robots meta tag */}
        <meta name="robots" content="index, follow" />
        {/* Author meta tag */}
        <meta name="author" content="Olivier Stephan" />
        {/* Keywords meta tag */}
        <meta name="keywords" content="dailygame, game, daily, guess, screenshot, characteristics" />
        {/* Open Graph tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:image" content="/screenshot.webp" />
        <meta property="og:url" content={router.asPath} />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        {description && <meta name="twitter:description" content={description} />}
        <meta name="twitter:image" content="/screenshot.webp" />
      </Head>
      <header>
        {(router.pathname !== '/' && router.pathname !== '/by-screenshots') && (
          <Link href="/" className="text-center p-1 text-xl hover:underline hover:scale-105">
            ← Back to DailyGame
          </Link>
        )}
      </header>
      <main className="flex-1">{children}</main>
    </motion.div>
  );
};

export default Layout;
