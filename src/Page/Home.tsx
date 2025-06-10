

import Navbar from "../components/Navbar";
import { Hero } from "../Inner/Hero";

const Home = () => {
  return (
    <div className="min-h-screen ">
      {/* Header Navigation */}
      <Navbar/>

      {/* Hero Section */}
  <Hero/>
    </div>
  );
};

export default Home;
