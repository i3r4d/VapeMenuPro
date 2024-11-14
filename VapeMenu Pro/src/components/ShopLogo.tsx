import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface ShopLogoProps {
  logo?: string;
  onLogoChange: (logo: string) => void;
}

export default function ShopLogo({ logo, onLogoChange }: ShopLogoProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative w-12 h-12 mx-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {logo ? (
        <img
          src={logo}
          alt="Shop Logo"
          className="w-full h-full object-contain rounded-lg"
        />
      ) : (
        <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center">
          <Upload className="w-6 h-6 text-white/70" />
        </div>
      )}
      
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        title="Upload shop logo"
      />
      
      {isHovering && (
        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
          <Upload className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}