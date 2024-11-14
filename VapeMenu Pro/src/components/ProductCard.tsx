import React from 'react';
import { Edit, Trash2, Tag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

export default function ProductCard({ product, isAdmin, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-36">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
            Out of Stock
          </div>
        )}
        {product.promotion && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs flex items-center">
            <Tag className="w-3 h-3 mr-1" />
            {product.promotion.value}% Off
          </div>
        )}
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
          </div>
          <span className="text-base font-bold text-purple-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-600 text-xs line-clamp-2 mb-2">{product.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">
            {product.isSaltNic ? 'Salt Nic' : 'E-Liquid'}
          </span>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
            {product.nicotineLevel}mg
          </span>
        </div>
        
        {isAdmin && (
          <div className="flex justify-end space-x-1">
            <button
              onClick={() => onEdit?.(product)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete?.(product.id)}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}