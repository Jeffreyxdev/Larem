import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchBarProps {
  onSearch: (location: string, model: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [location, setLocation] = useState('');
  const [model, setModel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(location, model);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Location
            </label>
            <Input
              type="text"
              placeholder="Enter city or state"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white border-gray-300 text-black placeholder-gray-400 focus:border-lemren-green"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Car Model
            </label>
            <Input
              type="text"
              placeholder="Brand or model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="bg-white border-gray-300 text-black placeholder-gray-400 focus:border-lemren-green"
            />
          </div>
          <div className="flex items-end">
            <Button
              type="submit"
              className="bg-lemren-green hover:bg-lemren-green-dark text-white font-semibold px-8 py-3 h-10 transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
