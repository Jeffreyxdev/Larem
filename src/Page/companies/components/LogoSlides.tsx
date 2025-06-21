import TeslaLogo from "../../../assets/tesla.png";
import JeepLogo from "../../../assets/jeep.png";
import PorscheLogo from "../../../assets/porsche.png";
import LamboghiniLogo from "../../../assets/lamborghini.png";
import BenzLogo from "../../../assets/mercedez.png";
import AstonMartinLogo from "../../../assets/aston-martin.png";

export function LogoSlides() {
  return (
    <section className="px-4 sm:px-8 md:px-16 mt-20 max-w-[1210px] mx-auto">
      <div className="flex justify-between items-center w-40 my-15">
        <img src={LamboghiniLogo} alt="lamboghini_logo" />
        <img src={TeslaLogo} alt="tesla_logo" />
        <img src={JeepLogo} alt="jeep_logo" />
        <img src={TeslaLogo} alt="tesla_logo" />
        <img src={BenzLogo} alt="benz_logo" />
        <img src={PorscheLogo} alt="porsche_logo" />
        <img src={AstonMartinLogo} alt="aston-martin_logo" />
      </div>
    </section>
  );
}
