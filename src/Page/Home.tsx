

import Navbar from "../components/Navbar";
import DiscoverDeals from "../Inner/DiscoverableCars";

import { Hero } from "../Inner/Hero";
import CompanyShowcase from "../Inner/Showcase";
import Stats from "../Inner/stactistics"
const Home = () => {
  return (
    <div className="min-h-screen ">
      {/* Header Navigation */}
      <Navbar/>
      <Hero/>
      <Stats/>
      <CompanyShowcase/>
      <DiscoverDeals/>
     

    </div>
  );
};

export default Home;
