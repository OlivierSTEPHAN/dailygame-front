// pages/index.tsx

import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer"; // Import the Footer component
import Link from "next/link";
import Layout from "@/components/Layout";
import ChooseGame from "@/components/ChooseGame";

const Home: React.FC = () => {
  return (
    <Layout
      title={"Game Guessing App"}
      description="Guess the video game based on screenshots"
    >
      <ChooseGame />
    </Layout>
  );
};

export default Home;
