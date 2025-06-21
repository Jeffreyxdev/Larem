import CarCollection from "../../../assets/car-collection.jpg";

export function CompaniesHeroBanner() {
  return (
    <section className=" max-w-[1300px] mx-auto mb-25 mt-4">
      <div className="flex justify-center items-center bg-gray-100 rounded-[15px] mx-6 overflow-hidden">
        <div className="mx-20">
          <h1 className="text-[60.09px] leading-[65.1px] max-w-100 cor">
            Fuel your Sales with Lemren<span className="text-[#02f47f]">.</span>
          </h1>
          <button className="poppins bg-black font-semibold hover:bg-black/70 text-white px-10 py-1 rounded-[30px] mt-5 hover:bg-foreground/90 transition-colors cursor-pointer">
            Get Started
          </button>
        </div>
        <div>
          <img
            src={CarCollection}
            className="object-cover w-300 h-110"
            alt="banner-image"
          />
        </div>
      </div>
    </section>
  );
}
