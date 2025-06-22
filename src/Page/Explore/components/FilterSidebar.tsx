import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onFiltersChange: (filters: any) => void;
}

const FilterSidebar = ({ isOpen, onToggle, onFiltersChange }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState({ min: '', max: '' });
  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');

  const brands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Ford', 'Chevrolet', 'Nissan'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

  const handleBrandChange = (brand: string, checked: boolean) => {
    let newSelectedBrands;
    if (checked) {
      newSelectedBrands = [...selectedBrands, brand];
    } else {
      newSelectedBrands = selectedBrands.filter(b => b !== brand);
    }
    setSelectedBrands(newSelectedBrands);
    
    // Apply filters immediately
    applyFiltersWithBrands(newSelectedBrands);
  };

  const applyFiltersWithBrands = (brands: string[]) => {
    const filters = {
      priceRange,
      selectedBrands: brands,
      yearRange,
      transmission,
      fuelType
    };
    onFiltersChange(filters);
  };

  const applyFilters = () => {
    const filters = {
      priceRange,
      selectedBrands,
      yearRange,
      transmission,
      fuelType
    };
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    setPriceRange({ min: '', max: '' });
    setSelectedBrands([]);
    setYearRange({ min: '', max: '' });
    setTransmission('');
    setFuelType('');
    onFiltersChange({});
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={onToggle}
          variant="outline"
          className="w-full bg-white border-gray-300 text-black hover:bg-gray-50"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {isOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white rounded-xl p-6 border border-gray-200 shadow-sm`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-black">Filters</h3>
          <Button
            onClick={clearFilters}
            variant="ghost"
            className="text-lemren-green hover:text-lemren-green-light text-sm"
          >
            Clear All
          </Button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Price Range (per day)</h4>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="bg-white border-gray-300 text-black placeholder-gray-400"
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="bg-white border-gray-300 text-black placeholder-gray-400"
            />
          </div>
        </div>

        {/* Car Brands */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Car Brand</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked:boolean) => handleBrandChange(brand, checked as boolean)}
                  className="border-gray-400 data-[state=checked]:bg-lemren-green data-[state=checked]:border-lemren-green"
                />
                <label htmlFor={brand} className="text-sm text-gray-700 cursor-pointer">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Year Range */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Year</h4>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="From"
              value={yearRange.min}
              onChange={(e) => setYearRange({ ...yearRange, min: e.target.value })}
              className="bg-white border-gray-300 text-black placeholder-gray-400"
            />
            <Input
              type="number"
              placeholder="To"
              value={yearRange.max}
              onChange={(e) => setYearRange({ ...yearRange, max: e.target.value })}
              className="bg-white border-gray-300 text-black placeholder-gray-400"
            />
          </div>
        </div>

        {/* Transmission */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Transmission</h4>
          <Select value={transmission} onValueChange={setTransmission}>
            <SelectTrigger className="bg-white border-gray-300 text-black">
              <SelectValue placeholder="Select transmission" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="automatic" className="text-black">Automatic</SelectItem>
              <SelectItem value="manual" className="text-black">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fuel Type */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Fuel Type</h4>
          <Select value={fuelType} onValueChange={setFuelType}>
            <SelectTrigger className="bg-white border-gray-300 text-black">
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              {fuelTypes.map((fuel) => (
                <SelectItem key={fuel} value={fuel.toLowerCase()} className="text-black">
                  {fuel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={applyFilters}
          className="w-full bg-lemren-green hover:bg-lemren-green-dark text-white font-semibold"
        >
          Apply Filters
        </Button>
      </div>
    </>
  );
};

export default FilterSidebar;
