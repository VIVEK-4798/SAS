'use client';
import React, { useContext, useState } from "react";
import { CartContext } from "../sessionWrapper";
import MenuItemTile from '../Menu/MenuItemTile'
import toast from "react-hot-toast";
import Image from "next/image";

const MenuItems = (menuItem) => {
  const { image, name, description, basePrice, sizes = [], extraIngredientsPrices = [] } = menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useContext(CartContext);

  const validImage = image?.[0]?.trim?.() !== "" ? image[0] : "/sas2-logo.jpg";

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientsPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    setShowPopup(false);
    toast.success('Added to cart!');
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extraThing]);
    } else {
      setSelectedExtras(prev => prev.filter(e => e.name !== extraThing.name));
    }
  }

  // Compute selected size price
  const sizePrice = selectedSize?.price || 0;

  // Subtract first extraIngredientsPrices[0]?.price if present (assuming it's a discount)
  const discount = extraIngredientsPrices?.[0]?.price || 0;

  // Final price calculation
  const finalPrice = basePrice + sizePrice - discount;

  return (
    <>
      {showPopup && (
        <div onClick={() => setShowPopup(false)} className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <div onClick={ev => ev.stopPropagation()} className="my-8 bg-white p-2 rounded-lg max-w-md">
            <div className="overflow-y-scroll p-2" style={{ maxHeight: 'calc(100vh - 90px)' }}>
              {!imageLoaded && <div className="h-48 w-full bg-gray-300 animate-pulse"></div>}
              <Image
                src={validImage}
                alt={name}
                width={300}
                height={200}
                className="mx-auto"
                onLoad={() => setImageLoaded(true)}
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">{description}</p>

              {sizes?.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700 font-semibold">Pick your size</h3>
                  {sizes.map((size, i) => {
                    const price = basePrice + size.price - discount;
                    return (
                      <label key={i} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                        <input
                          type="radio"
                          onChange={() => setSelectedSize(size)}
                          checked={selectedSize?.name === size.name}
                          name="size"
                        />
                        {size.name} ₹{price}
                      </label>
                    );
                  })}
                </div>
              )}

              <button
                onClick={handleAddToCartButtonClick}
                className="primary sticky bottom-2"
                type="button"
              >
                Add to cart ₹{finalPrice}
              </button>
              <button onClick={() => setShowPopup(false)} className="mt-2">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
};

export default MenuItems;
