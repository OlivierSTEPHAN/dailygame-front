// pages/index.tsx

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
