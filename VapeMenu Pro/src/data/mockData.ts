import { Product, Category, Deal } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'E-Liquid', slug: 'e-liquid' },
  { id: '2', name: 'Salt Nic', slug: 'salt-nic' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Strawberry Blast',
    description: 'Sweet and juicy strawberry blend',
    price: 24.99,
    category: 'e-liquid',
    image: 'https://images.unsplash.com/photo-1562160376-a1a2aa0926f4?auto=format&fit=crop&w=500',
    inStock: true,
    isSaltNic: false,
  },
  {
    id: '2',
    name: 'Mint Freeze',
    description: 'Refreshing mint with a cool finish',
    price: 29.99,
    category: 'salt-nic',
    image: 'https://images.unsplash.com/photo-1562160375-a1a2aa0926f4?auto=format&fit=crop&w=500',
    inStock: true,
    isSaltNic: true,
  },
];

export const deals: Deal[] = [
  {
    id: '1',
    title: 'Weekend Special',
    description: 'Get 20% off on all Salt Nic flavors',
    discount: 20,
    validUntil: '2024-03-31',
    productIds: ['2'],
  },
];