

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


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
      {/* Add more sections as needed */}
     <Footer/> {/*added footer*/}
    

    </div>
  );
};

export default Home;
