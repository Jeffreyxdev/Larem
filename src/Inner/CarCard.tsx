// src/components/CarCard.tsx
import React from 'react';
import { Sparkles, MapPin, Gauge, Fuel } from 'lucide-react'; // Assuming you have lucide-react installed

interface CarCardProps {
  imageSrc: string;
  name: string;
  location: string;
  miles: string;
  fuelType: string;
  price: string;
  rating: number; // For the star rating
}

const CarCard: React.FC<CarCardProps> = ({
  imageSrc,
  name,
  location,
  miles,
  fuelType,
  price,
  rating,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center">
      <img src={imageSrc} alt={name} className="w-full h-32 object-cover rounded-lg mb-3" />
      <div className="text-xl font-bold text-gray-800 mb-1">{name}</div>
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <MapPin size={16} className="mr-1 text-gray-500" /> {location}
      </div>
      <div className="flex justify-around w-full text-gray-700 text-sm mb-3">
        <div className="flex items-center">
          <Gauge size={16} className="mr-1 text-gray-500" /> {miles}
        </div>
        <div className="flex items-center">
          <Fuel size={16} className="mr-1 text-gray-500" /> {fuelType}
        </div>
      </div>
      <div className="text-2xl font-bold text-blue-600 mb-3">{price}</div>
      <div className="flex items-center mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Sparkles // Using Sparkles for stars, replace with actual star icon if available
            key={i}
            size={18}
            className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
            fill={i < rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        View Details
      </button>
    </div>
  );
};

export default CarCard;