import React from 'react';
import { Menu, Search, Settings, Plus } from 'lucide-react';
import ShopLogo from './ShopLogo';

interface NavbarProps {
  toggleSidebar: () => void;
  isAdmin: boolean;
  onSearch: (query: string) => void;
  onAddProduct: () => void;
  logo?: string;
  onLogoChange: (logo: string) => void;
  showAdminControls?: boolean;
}

export default function Navbar({
  toggleSidebar,
  isAdmin,
  onSearch,
  onAddProduct,
  logo,
  onLogoChange,
  showAdminControls = false,
}: NavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-4 fixed w-full top-0 z-40">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="p-2 hover:bg-white/10 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          
          <ShopLogo logo={logo} onLogoChange={onLogoChange} />
          
          <h1 className="text-2xl font-bold">VapeMenu Pro</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Search products..."
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-white/10 focus:bg-white/20 focus:outline-none"
            />
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-white/70" />
          </div>
          {isAdmin && showAdminControls && (
            <div className="flex items-center space-x-2">
              <button
                onClick={onAddProduct}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Add Product</span>
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}