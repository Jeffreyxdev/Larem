// src/components/DiscoverDeals.tsx
import React from 'react';
import CarCard from './CarCard'; // Import the CarCard component

// Placeholder images - replace with your actual image paths
// You might need to place these in your `public` folder or import them
const carImage1 = 'https://via.placeholder.com/300x200?text=Car+1';
const carImage2 = 'https://via.placeholder.com/300x200?text=Car+2';
const carImage3 = 'https://via.placeholder.com/300x200?text=Car+3';

// Placeholder brand logos
const audiLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Audi_logo_Rings.svg/2560px-Audi_logo_Rings.svg.png';
const benzLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo.svg/1024px-Mercedes-Benz_Logo.svg.png';
const bmwLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW_logo_%282020%29.svg/2048px-BMW_logo_%282020%29.png';
const lexusLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Lexus_logo.svg/2560px-Lexus_logo.svg.png';
const toyotaLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Toyota_logo_2020.svg/2560px-Toyota_logo_2020.svg.png';
const hondaLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Motor_Co._Ltd._logo.svg/2560px-Honda_Motor_Co._Ltd._logo.png';


const DiscoverDeals: React.FC = () => {
  const topRankingCars = [
    {
      imageSrc: carImage1,
      name: 'Mercedes-Benz C-Class',
      location: 'New York, USA',
      miles: '10,000 miles',
      fuelType: 'Petrol',
      price: '$35,000',
      rating: 4,
    },
    {
      imageSrc: carImage2,
      name: 'BMW 3 Series',
      location: 'Los Angeles, USA',
      miles: '15,000 miles',
      fuelType: 'Diesel',
      price: '$32,500',
      rating: 5,
    },
  ];

  const newArrivalsCars = [
    {
      imageSrc: carImage3,
      name: 'Audi A4',
      location: 'Chicago, USA',
      miles: '5,000 miles',
      fuelType: 'Petrol',
      price: '$40,000',
      rating: 4,
    },
    {
      imageSrc: carImage1, // Reusing placeholder for example
      name: 'Lexus ES',
      location: 'Houston, USA',
      miles: '8,000 miles',
      fuelType: 'Hybrid',
      price: '$38,000',
      rating: 4,
    },
  ];

  const carBrands = [
    { name: 'Audi', logo: audiLogo },
    { name: 'Mercedes-Benz', logo: benzLogo },
    { name: 'BMW', logo: bmwLogo },
    { name: 'Lexus', logo: lexusLogo },
    { name: 'Toyota', logo: toyotaLogo },
    { name: 'Honda', logo: hondaLogo },
    // Add more brands as needed
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">
          Discover the best deals 
        </h2>

        {/* Top Ranking Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Top ranking
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-2 gap-8 justify-items-center">
            {topRankingCars.map((car, index) => (
              <CarCard key={index} {...car} />
            ))}
          </div>
        </div>

        {/* New Arrivals Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            New Arrivals
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
            {newArrivalsCars.map((car, index) => (
              <CarCard key={index} {...car} />
            ))}
          </div>
        </div>

        {/* Car Brands Logos Section */}
        <div className="mt-12">
          <div className="flex justify-center items-center flex-wrap gap-x-8 gap-y-6">
            {carBrands.map((brand, index) => (
              <img
                key={index}
                src={brand.logo}
                alt={brand.name}
                className="h-10 opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverDeals;