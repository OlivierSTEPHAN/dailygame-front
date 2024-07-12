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
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="/favicon.ico" />
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
