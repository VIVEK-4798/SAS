import React from 'react';
import AddToCartButton from '../Menu/AddToCartButton';

const MenuItemTile = ({onAddToCart, ...item }) => {

    const {image, description, name, basePrice, sizes, extraIngredientsPrices} = item;

    return (
    <div
        className="bg-gray-200 p-4 rounded-lg
         text-center hover:bg-white hover:shadow-md
          hover:shadow-black/25 transition-all"
      >
      <div className="text-center">
        <img
          src={image}
          className="max-h-auto max-h-24
            block mx-auto"
          alt="pizza"
        />
      </div>
      <h4 className="font-semibold my-3 text-xl line-clamp-1">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">
        {description}
      </p>
      <button
        onClick={onAddToCart}
        className="mt-4 bg-primary text-white
             rounded-full px-6 py-2">
        {(sizes.length > 0 || extraIngredientsPrices.length > 0) ?(
          <span>Add to cart (from ₹{basePrice})</span>
        ):(
          <span>Add to cart ₹{basePrice}</span>
        )}
      </button>
      </div>
  )
}

export default MenuItemTile