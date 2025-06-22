
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SortControlsProps {
  onSortChange: (sortBy: string) => void;
  currentSort: string;
}

const SortControls = ({ onSortChange, currentSort }: SortControlsProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-gray-700">
        <span className="text-sm">Showing all available cars</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Sort by:</span>
        <Select value={currentSort} onValueChange={onSortChange}>
          <SelectTrigger className="w-48 bg-white border-gray-300 text-black">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-300">
            <SelectItem value="popular" className="text-black">Most Popular</SelectItem>
            <SelectItem value="price-low" className="text-black">Price: Low to High</SelectItem>
            <SelectItem value="price-high" className="text-black">Price: High to Low</SelectItem>
            <SelectItem value="newest" className="text-black">Newest First</SelectItem>
            <SelectItem value="rating" className="text-black">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortControls;
