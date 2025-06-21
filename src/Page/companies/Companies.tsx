import Navbar from "../../components/Navbar";
import { CompaniesHeroBanner } from "./components/CompaniesHeroBanner";
import { ReasonsToStart } from "./components/ReasonsToStart";
import { CompaniesStats } from "./components/CompaniesStats";
import { Testimonials } from "./components/Testimonials";
import { LogoSlides } from "./components/LogoSlides";

export default function Companies() {
  return (
    <div>
      <Navbar />
      <CompaniesHeroBanner />
      <ReasonsToStart />
      <CompaniesStats />
      <Testimonials />
      <LogoSlides />
    </div>
  );
}
