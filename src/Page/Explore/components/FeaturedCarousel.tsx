
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface FeaturedCarouselProps {
  cars: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    location: string;
    rating: number;
    badge?: string;
  }>;
}

const FeaturedCarousel = ({ cars }: FeaturedCarouselProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-lemren-white">Featured Cars</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-lemren-light-gray border-gray-700 text-lemren-white hover:bg-lemren-dark-gray"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-lemren-light-gray border-gray-700 text-lemren-white hover:bg-lemren-dark-gray"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {cars.map((car) => (
          <div
            key={car.id}
            className="flex-shrink-0 w-80 bg-lemren-light-gray rounded-xl overflow-hidden border border-gray-800 hover:border-lemren-green transition-all duration-300"
          >
            <div className="relative">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              {car.badge && (
                <div className="absolute top-3 left-3 bg-lemren-green text-lemren-black px-3 py-1 rounded-full text-xs font-semibold">
                  {car.badge}
                </div>
              )}
              <div className="absolute top-3 right-3 bg-lemren-black/80 text-lemren-white px-2 py-1 rounded-md text-xs flex items-center">
                ⭐ {car.rating.toFixed(1)}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-lemren-white mb-2">
                {car.name}
              </h3>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-lemren-off-white text-sm">{car.location}</span>
                <span className="text-lemren-green font-bold text-xl">
                  ${car.price}<span className="text-sm text-lemren-off-white">/day</span>
                </span>
              </div>
              
              <button className="w-full bg-lemren-green hover:bg-lemren-green-dark text-lemren-black font-semibold py-2 px-4 rounded-lg transition-colors">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
