import React, { useState } from 'react';
import { Heart, Search, ShoppingCart, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import BottomSheetNego from '../../components/BottomSheetChat';
import { useNavigate } from 'react-router-dom';

interface ProductDetailProps {
  productName?: string;
  price?: string;
  images?: string[];
}

interface Products {
  productName: string;
  price: string;
  images: string;
}

const dummyProducts: Products[] = [
  {
    productName: "Image A",
    price: "Rp5000",
    images: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop"
  },
  {
    productName: "Blouse Cantik",
    price: "Rp20.000",
    images: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop"
  },
  {
    productName: "Blouse Cantik",
    price: "Rp25.000",
    images: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop"
  },
  {
    productName: "Blouse Cantik",
    price: "Rp65.000",
    images: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop"
  }
];

const NegotiationPage: React.FC<ProductDetailProps> = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  
  const currentProduct = dummyProducts[currentProductIndex];
  const navigate = useNavigate();

  const nextProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      (prevIndex + 1) % dummyProducts.length
    );
  };

  const prevProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      (prevIndex - 1 + dummyProducts.length) % dummyProducts.length
    );
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <>
      <div className="min-h-screen relative">
        <div className="relative h-screen">
          {/* Background Image */}
          <img 
            src={currentProduct.images} 
            alt={currentProduct.productName}
            className="w-full h-full object-cover"
          />

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-30">
            <div className="flex items-center justify-between p-4 mt-4">
              <ArrowLeft className="w-7 h-7 text-white bg-black/10 rounded-full p-1"  onClick={() => navigate("/home/photoku")} />
              <div className="flex items-center space-x-4">
                <Search className="w-6 h-6 text-white" onClick={() => navigate("/search")} />
                <ShoppingCart className="w-6 h-6 text-white" onClick={() => navigate("/home/cart")} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="bg-gradient-to-b from-transparent via-[#043A70]/40 to-[#043A70]/40 via-60% to-90% pt-32 px-4 pb-10">
              <h1 className="text-base text-center text-white">
                Harga <span className="text-base font-bold">{currentProduct.price}</span>
              </h1>

              <div className="flex w-full justify-center gap-6">
                <button 
                  className="border border-white text-white py-2 w-full rounded-full mt-4 text-base" 
                  onClick={() => setShowSheet(true)}
                >
                  Nego
                </button>
                <button 
                  className="bg-[#001A41] text-white py-2 w-full rounded-full mt-4 text-base"
                  onClick={() => navigate("/home/cart")}>
                  + Keranjang
                </button>
              </div>

              <p className="text-center text-white mt-4 text-xs underline">Bukan wajah saya?</p>
            </div>
          </div>

          {/* Prev & Next Buttons */}
          <button 
            onClick={prevProduct}
            className="absolute left-4 top-1/2 z-20 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-2 text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={nextProduct}
            className="absolute right-4 top-1/2 z-20 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-2 text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Wishlist */}
          <button 
            onClick={toggleWishlist}
            className="absolute top-4 right-4 z-20 bg-opacity-90 rounded-full mt-16"
          >
            <Heart 
              className={`w-6 h-6 ${isWishlisted ? 'text-white fill-white' : 'text-gray-600'}`} 
            />
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      {showSheet && (
        <BottomSheetNego 
          onClose={() => setShowSheet(false)} 
          image={currentProduct.images}
          harga={currentProduct.price}
        />
      )}
    </>
  );
};

export default NegotiationPage;