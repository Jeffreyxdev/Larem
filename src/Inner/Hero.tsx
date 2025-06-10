import { useEffect } from 'react'
import car1 from '../assets/white jeep.jpg'
import car2 from '../assets/db.jpg'
import car3 from '../assets/merc.jpg'
import AOS from 'aos'
import 'aos/dist/aos.css';
export const Hero = () => {

    useEffect(()=> {
        AOS.init({
            duration: 1500,
            mirror: false,
            once: true,
             easing: 'ease-in-out',
        });
    },[] );
  return (
    <div>
            <section className="container mx-auto px-4 py-16">
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    {/* Text Section */}
    <div className="space-y-3 max-w-[89%] p-10 ">
      <h1   data-aos="zoom-in-up" 
      data-aos-delay="500"
     
      data-aos-duration='1500' className="text-4xl lg:text-5xl  cor leading-tight">
        The largest marketplace to buy, sell, rent and hire vehicles.
      </h1>
      <p data-aos="zoom-in-down"
      data-aos-anchor-placement="top-bottom"
       data-aos-delay="500"
      data-aos-duration='1500'
       className="text-lg text-muted-foreground leading-relaxed mt-2.5">
        Join thousands of trusted users renting, buying, leasing, and selling vehicles anytime, anywhere.
      </p>
      <button data-aos="zoom-in-up"
      data-aos-anchor-placement="top-bottom"
       data-aos-delay="500"
      data-aos-duration='1500'
       className="bg-black text-white hover:bg-black/90 px-10 py-2 text-lg rounded-full mt-3.5">
        View cars
      </button>
    </div>

    {/* Image Layout */}
    <div className="grid grid-cols-3 gap-4">
      <div className="aspect-[3/7] bg-muted rounded-2xl overflow-hidden">
        <img data-aos="fade-up-right"
         data-aos-delay="500"
        data-aos-duration='1500'
           src={car1} 
          alt="White SUV in modern garage" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="aspect-[3/7] bg-muted rounded-3xl overflow-hidden mt-8">
        <img 
        data-aos="fade-up"
         data-aos-delay="500"
        data-aos-duration='1500'
        data-aos-anchor-placement="center-bottom"
          src={car3}
          alt="Silver sports car" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="aspect-[3/7] bg-muted rounded-2xl overflow-hidden">
        <img 
        data-aos="fade-up-left"
         data-aos-delay="500"
        data-aos-duration='1500'
           src={car2}
          alt="Gray Mercedes AMG GT" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</section>


      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <div className="text-4xl lg:text-4xl  text-foreground">2,000+</div>
            <div className="text-muted-foreground">Cars sold over time</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl lg:text-4xl  text-foreground">45,000+</div>
            <div className="text-muted-foreground">Rental deals closed</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl lg:text-4xl  text-foreground">12,000+</div>
            <div className="text-muted-foreground">Vehicles hired overtime</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl lg:text-4xl  text-foreground">3,000+</div>
            <div className="text-muted-foreground">Registered companies</div>
          </div>
        </div>
      </section>
    </div>
  )
}
