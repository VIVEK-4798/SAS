import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa';

const MenuItemTile = ({ onAddToCart, ...item }) => {
  const { image, description, name, basePrice, sizes, extraIngredientsPrices } = item;
  console.log(extraIngredientsPrices);

  const validImages = image?.length > 0 ? image : ["/sas2-logo.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Randomize image change interval
  const randomInterval = Math.floor(Math.random() * 4000) + 3000; // Random interval between 3 to 7 seconds

  // Auto-rotate images with random timing
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }, randomInterval);
    return () => clearInterval(interval);
  }, [validImages.length, randomInterval]);

  const handlePrevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const handleNextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-[#faebd9] p-5 rounded-2xl text-center 
                hover:shadow-xl hover:shadow-black/10 transition-all 
                flex flex-col border border-[#f0e0cc] min-h-[580px]"
    >

      {/* Image Carousel */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4">

        <AnimatePresence custom={direction}>
          <motion.div
            key={currentImageIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={validImages[currentImageIndex]}
              alt={name}
              fill
              className="object-contain bg-[#faebd9]"
              priority={currentImageIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            {/* Left Arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3
                        text-gray-800 p-2 rounded-full
                        z-10 focus:outline-none transition-all border-none"
              aria-label="Previous image"
            >
              <FaChevronLeft size={18} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 
                        text-gray-800 p-2 rounded-full
                        z-10 focus:outline-none transition-all border-none"
              aria-label="Next image"
            >
              <FaChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Product Info */}
     <h4 className="font-bold text-xl text-gray-800 mb-2">{name}</h4>
      <p className="text-gray-700 text-sm flex-grow mb-4 px-2 max-h-[72px] ">
        {description}
      </p>

      {/* Price & Add to Cart */}
      <div className="mt-auto">
        <motion.button
          onClick={onAddToCart}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-gradient-to-r from-[#395f79] to-[#1B3B50] text-white 
                    rounded-full px-6 py-3 w-full font-medium shadow-md
                    flex items-center justify-center gap-2"
        >
          <FaShoppingCart />
          {extraIngredientsPrices.length > 0 ? (
            <span className="flex gap-2 items-center">
              <span className="text-xs font-normal">{extraIngredientsPrices[0].name}</span>
              <span>
                ₹{basePrice - extraIngredientsPrices[0].price}{" "}
                <span className="line-through text-white/70 ml-1 text-xs">₹{basePrice}</span>
              </span>
            </span>
          ) : sizes.length > 0 ? (
            <span>From ₹{basePrice}</span>
          ) : (
            <span>₹{basePrice}</span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MenuItemTile;
