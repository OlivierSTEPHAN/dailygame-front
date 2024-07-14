// pages/index.tsx

import Layout from "@/components/Layout";
import ChooseGame from "@/components/ChooseGame";

const Home: React.FC = () => {
  return (
    <Layout
      title={"DailyGame - The game guessing app"}
      description="Guess the video game based on screenshots, or its characteristics."
    >
      <ChooseGame />
    </Layout>
  );
};

export default Home;
