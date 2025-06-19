import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MenuItemTile = ({ onAddToCart, ...item }) => {
  const { image, description, name, basePrice, sizes, extraIngredientsPrices } = item;
  console.log("MenuItemTile", item);
  

  const validImages = image?.length > 0 ? image : ["/pizzeria-logo.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1); // next
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [validImages.length]);

  const handlePrevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const handleNextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
  };

  return (
    <div
      className="group bg-gray-200 p-4 rounded-lg text-center 
      hover:bg-gray-100 hover:shadow-md hover:shadow-black/25 
      transition-all flex flex-col h-full min-h-[550px]"
    >
      <div className="relative w-full h-[300px] bg-gray-200 group-hover:bg-gray-100 overflow-hidden mb-3">
        {/* Image Slider */}
        <div className="relative w-full h-full overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`,
              flexDirection: 'row',
            }}
          >
            {validImages.map((img, index) => (
              <div key={index} className="relative min-w-full h-full">
                <Image
                  src={img}
                  alt={name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-md bg-gray-200"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3
                        bg-transparent text-black hover:text-gray-500 p-3 pr-10
                        z-10 focus:outline-none border-none"
              type="button"
            >
              <FaChevronLeft size={28} />
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 
                        bg-transparent text-black hover:text-gray-500 p-3 pl-10
                        z-10 focus:outline-none border-none"
              type="button"
            >
              <FaChevronRight size={28} />
            </button>
          </>
        )}
      </div>

      <h4 className="font-semibold my-2 text-lg line-clamp-1">{name}</h4>

      <p className="text-gray-500 text-sm line-clamp-3 flex-grow mb-4">
        {description}
      </p>

<div className="mt-auto">
  <button
    onClick={onAddToCart}
    className="bg-primary text-white rounded-full px-6 py-2 w-full text-sm sm:text-base"
  >
    {extraIngredientsPrices.length > 0 ? (
      <span>
        {extraIngredientsPrices[0].name} OFF – Now ₹
        {basePrice - extraIngredientsPrices[0].price}{" "}
        <span className="line-through opacity-70 ml-1">₹{basePrice}</span>
      </span>
    ) : sizes.length > 0 ? (
      <span>Add to cart (from ₹{basePrice})</span>
    ) : (
      <span>Add to cart ₹{basePrice}</span>
    )}
  </button>
</div>

    </div>
  );
};

export default MenuItemTile;
