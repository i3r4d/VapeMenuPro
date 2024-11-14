import React from 'react';
import { X } from 'lucide-react';
import { Category } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
}: SidebarProps) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Categories</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <nav className="p-4">
        <button
          onClick={() => onSelectCategory('all')}
          className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
            selectedCategory === 'all'
              ? 'bg-purple-100 text-purple-900'
              : 'hover:bg-gray-100'
          }`}
        >
          All Products
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.slug)}
            className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
              selectedCategory === category.slug
                ? 'bg-purple-100 text-purple-900'
                : 'hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>
    </div>
  );
}