import React from 'react';
import { Filter } from 'lucide-react';
import { Product, FilterState } from '../types';

interface ProductFiltersProps {
  products: Product[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function ProductFilters({ products, filters, onFilterChange }: ProductFiltersProps) {
  const brands = [...new Set(products.map(p => p.brand))];
  const nicotineLevels = [...new Set(products.map(p => p.nicotineLevel))].sort((a, b) => a - b);
  const allIngredients = [...new Set(products.flatMap(p => p.ingredients))].sort();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 text-purple-600 mr-2" />
        <h3 className="font-semibold">Filters</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <select
            value={filters.brand || ''}
            onChange={(e) => onFilterChange({ ...filters, brand: e.target.value || undefined })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nicotine Level</label>
          <select
            value={filters.nicotineLevel || ''}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              nicotineLevel: e.target.value ? Number(e.target.value) : undefined 
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">All Levels</option>
            {nicotineLevels.map(level => (
              <option key={level} value={level}>{level}mg</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
          <select
            value={filters.ingredients?.[0] || ''}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              ingredients: e.target.value ? [e.target.value] : undefined 
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">All Ingredients</option>
            {allIngredients.map(ingredient => (
              <option key={ingredient} value={ingredient}>{ingredient}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="promotions"
            checked={filters.hasPromotion}
            onChange={(e) => onFilterChange({ ...filters, hasPromotion: e.target.checked })}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="promotions" className="ml-2 text-sm text-gray-700">
            Show Promotions Only
          </label>
        </div>
      </div>
    </div>
  );
}