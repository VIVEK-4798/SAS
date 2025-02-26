import React, { useContext } from "react";
import { CartContext } from "../sessionWrapper";

const menuItems = (menuItem) => {

  const {image ,name ,description ,basePrice,
          sizes,extraIngredeientsPrices} = menuItem;
  const {addToCart} = useContext(CartContext);

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
      <h4 className="font-semibold my-3 text-xl">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">
        {description}
      </p>
      <button
        onClick={() => addToCart(menuItem)}
        className="mt-4 bg-primary text-white
             rounded-full px-8 py-2"
      >
        Add to cart ₹{basePrice}
      </button>
    </div>
  );
};

export default menuItems;
