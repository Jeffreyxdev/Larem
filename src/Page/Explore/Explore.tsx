import  { useState, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import CarCard from './components/CarCard';
import FeaturedCarousel from './components/FeaturedCarousel';
import SortControls from './components/Sortcontrols';
// import Navbar from '../../components/Navbar';


const Explore = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    model: '',
  });
  const [appliedFilters, setAppliedFilters] = useState<any>({});

  // Enhanced mock data with categories and host badges
  const featuredCars = [
    {
      id: '1',
      name: 'BMW X5 2023',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
      price: 89,
      location: 'Lagos, Nigeria',
      rating: 4.9,
      badge: 'Superhost'
    },
    {
      id: '2',
      name: 'Mercedes GLE 2022',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
      price: 95,
      location: 'Abuja, Nigeria',
      rating: 4.8,
      badge: 'New'
    },
    {
      id: '3',
      name: 'Tesla Model Y 2023',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
      price: 110,
      location: 'Port Harcourt, Nigeria',
      rating: 4.9,
      badge: 'Electric'
    }
  ];

  const allCars = [
    {
      id: '1',
      name: 'Toyota Camry 2022',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
      price: 45,
      location: 'Lagos, Nigeria',
      rating: 4.7,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      year: 2022,
      brand: 'Toyota',
      category: 'rent' as const,
      hostBadge: null,
      isFeatured: false
    },
    {
      id: '2',
      name: 'Honda Accord 2023',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      price: 50,
      location: 'Abuja, Nigeria',
      rating: 4.6,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      year: 2023,
      brand: 'Honda',
      category: 'rent' as const,
      hostBadge: 'New' as const,
      isFeatured: true
    },
    {
      id: '3',
      name: 'BMW 3 Series 2021',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
      price: 75,
      location: 'Lagos, Nigeria',
      rating: 4.8,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      year: 2021,
      brand: 'BMW',
      category: 'rent' as const,
      hostBadge: 'Superhost' as const,
      isFeatured: false
    },
    {
      id: '4',
      name: 'Audi A4 2022',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      price: 25000,
      location: 'Port Harcourt, Nigeria',
      rating: 4.5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      year: 2022,
      brand: 'Audi',
      category: 'sale' as const,
      hostBadge: null,
      isFeatured: false
    },
    {
      id: '5',
      name: 'Ford Mustang 2023',
      image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&h=600&fit=crop',
      price: 85,
      location: 'Lagos, Nigeria',
      rating: 4.9,
      transmission: 'Manual',
      fuelType: 'Petrol',
      year: 2023,
      brand: 'Ford',
      category: 'rent' as const,
      hostBadge: 'New' as const,
      isFeatured: true
    },
    {
      id: '6',
      name: 'Nissan Altima 2022',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
      price: 18000,
      location: 'Kano, Nigeria',
      rating: 4.4,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      year: 2022,
      brand: 'Nissan',
      category: 'sale' as const,
      hostBadge: null,
      isFeatured: false
    }
  ];

  // Filter and sort cars based on applied filters and search
  const filteredAndSortedCars = useMemo(() => {
    let filtered = [...allCars];

    // Apply search filters
    if (searchFilters.location) {
      filtered = filtered.filter(car => 
        car.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    if (searchFilters.model) {
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(searchFilters.model.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchFilters.model.toLowerCase())
      );
    }

    // Apply sidebar filters
    if (appliedFilters.priceRange?.min) {
      filtered = filtered.filter(car => car.price >= Number(appliedFilters.priceRange.min));
    }

    if (appliedFilters.priceRange?.max) {
      filtered = filtered.filter(car => car.price <= Number(appliedFilters.priceRange.max));
    }

    if (appliedFilters.selectedBrands?.length > 0) {
      filtered = filtered.filter(car => 
        appliedFilters.selectedBrands.includes(car.brand)
      );
    }

    if (appliedFilters.yearRange?.min) {
      filtered = filtered.filter(car => car.year >= Number(appliedFilters.yearRange.min));
    }

    if (appliedFilters.yearRange?.max) {
      filtered = filtered.filter(car => car.year <= Number(appliedFilters.yearRange.max));
    }

    if (appliedFilters.transmission) {
      filtered = filtered.filter(car => 
        car.transmission.toLowerCase() === appliedFilters.transmission.toLowerCase()
      );
    }

    if (appliedFilters.fuelType) {
      filtered = filtered.filter(car => 
        car.fuelType.toLowerCase() === appliedFilters.fuelType.toLowerCase()
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [searchFilters, appliedFilters, sortBy, allCars]);

  const handleSearch = (location: string, model: string) => {
    setSearchFilters({ location, model });
    console.log('Searching for:', { location, model });
  };

  const handleFiltersChange = (filters: any) => {
    setAppliedFilters(filters);
    console.log('Filters changed:', filters);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    console.log('Sort changed:', newSort);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     {/* //create a special header here that will show list a car only when logged in then login and // */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Explore Amazing Cars
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect car for your next adventure. From luxury sedans to electric vehicles, 
            find your ideal ride at unbeatable prices.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Featured Cars Carousel */}
        <FeaturedCarousel cars={featuredCars} />

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Cars Grid */}
          <div className="flex-1">
            <SortControls 
              onSortChange={handleSortChange}
              currentSort={sortBy}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {filteredAndSortedCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No cars match your current filters.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {filteredAndSortedCars.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:border-lemren-green transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-lemren-green text-white rounded-lg font-semibold">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:border-lemren-green transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:border-lemren-green transition-colors">
                    3
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:border-lemren-green transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

    
     
    </div>
  )
}

export default Explore