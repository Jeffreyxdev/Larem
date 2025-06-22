
import { MessageCircle, Eye, Star } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface CarCardProps {
  car: {
    id: string;
    name: string;
    image: string;
    price: number;
    location: string;
    rating?: number;
    isFeatured?: boolean;
    transmission: string;
    fuelType: string;
    year: number;
    category?: 'rent' | 'sale';
    hostBadge?: 'Superhost' | 'New' | null;
  };
}

const CarCard = ({ car }: CarCardProps) => {
  const isForSale = car.category === 'sale';

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-lemren-green transition-all duration-300 hover:shadow-lg hover:shadow-lemren-green/10 group">
      <div className="relative">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {car.isFeatured && (
            <Badge className="bg-lemren-green text-white text-xs font-semibold">
              Featured
            </Badge>
          )}
          {car.hostBadge === 'Superhost' && (
            <Badge className="bg-yellow-500 text-white text-xs font-semibold">
              ⭐ Superhost
            </Badge>
          )}
          {car.hostBadge === 'New' && (
            <Badge className="bg-blue-500 text-white text-xs font-semibold">
              New
            </Badge>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <Badge 
            variant={isForSale ? "destructive" : "default"}
            className={`text-xs font-semibold ${
              isForSale 
                ? "bg-red-500 text-white" 
                : "bg-lemren-green text-white"
            }`}
          >
            {isForSale ? 'For Sale' : 'For Rent'}
          </Badge>
        </div>

        {/* Rating */}
        {car.rating && (
          <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded-md text-xs flex items-center">
            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
            {car.rating.toFixed(1)}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-lemren-green transition-colors">
          {car.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600 text-sm">{car.location}</span>
          <span className="text-lemren-green font-bold text-lg">
            ${car.price}
            <span className="text-sm text-gray-600">
              {isForSale ? '' : '/day'}
            </span>
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span>{car.year}</span>
          <span>•</span>
          <span>{car.transmission}</span>
          <span>•</span>
          <span>{car.fuelType}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
            {isForSale ? 'Buy Now' : 'Book Now'}
          </button>
          
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
            <Eye className="w-4 h-4 mr-1" />
            Details
          </button>
          
          <button className="bg-lemren-green hover:bg-lemren-green-dark text-white font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
