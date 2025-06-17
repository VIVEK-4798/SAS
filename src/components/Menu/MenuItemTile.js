import React from 'react';
import Image from 'next/image';

const MenuItemTile = ({ onAddToCart, ...item }) => {
  const { image, description, name, basePrice, sizes, extraIngredientsPrices } = item;

  return (
    <div
      className="bg-gray-200 p-4 rounded-lg text-center 
      hover:bg-white hover:shadow-md hover:shadow-black/25 
      transition-all flex flex-col h-full"
    >
      <div className="relative w-full h-[300px] rounded-md overflow-hidden mb-3">
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-md"
        />
      </div>

      <h4 className="font-semibold my-2 text-lg line-clamp-1">{name}</h4>

      <p className="text-gray-500 text-sm line-clamp-3 flex-grow mb-4">
        {description}
      </p>

      <div className="mt-auto">
        <button
          onClick={onAddToCart}
          className="bg-primary text-white rounded-full px-6 py-2 w-full"
        >
          {(sizes.length > 0 || extraIngredientsPrices.length > 0) ? (
            <span>Add to cart (from ₹{basePrice})</span>
          ) : (
            <span>Add to cart ₹{basePrice}</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default MenuItemTile;
