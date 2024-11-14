import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import Modal from './components/Modal';
import AdminDashboard from './components/AdminDashboard';
import { categories, products as initialProducts } from './data/mockData';
import { Product } from './types';

function App() {
  const [isAdmin] = useState(true);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [shopLogo, setShopLogo] = useState<string>();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'salt-nic' ? product.isSaltNic : !product.isSaltNic);
    
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (productData: Partial<Product>) => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        category: productData.isSaltNic ? 'salt-nic' : 'e-liquid',
      } as Product;
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
    setEditingProduct(undefined);
  };

  // Mock data for admin dashboard
  const mockShops = [
    {
      id: '1',
      name: 'Vapor Haven',
      ownerId: 'user1',
      createdAt: '2024-03-01',
      subscriptionStatus: 'active' as const,
    },
    {
      id: '2',
      name: 'Cloud Nine Vapes',
      ownerId: 'user2',
      createdAt: '2024-03-15',
      subscriptionStatus: 'trial' as const,
    },
  ];

  const mockUsers = [
    {
      id: 'user1',
      email: 'owner@vaporhaven.com',
      role: 'user' as const,
      subscriptionTier: 'premium' as const,
      subscriptionStatus: 'active' as const,
    },
    {
      id: 'user2',
      email: 'owner@cloudnine.com',
      role: 'user' as const,
      subscriptionTier: 'basic' as const,
      subscriptionStatus: 'trial' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isAdmin={isAdmin}
        onSearch={setSearchQuery}
        onAddProduct={() => setIsModalOpen(true)}
        logo={shopLogo}
        onLogoChange={setShopLogo}
        showAdminControls={showAdminDashboard}
      />
      
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="pt-20 px-4 pb-8">
        <div className="max-w-[1920px] mx-auto">
          {showAdminDashboard ? (
            <AdminDashboard shops={mockShops} users={mockUsers} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdmin={isAdmin && showAdminDashboard}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(undefined);
        }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingProduct(undefined);
          }}
        />
      </Modal>
    </div>
  );
}

export default App;