import React, { useContext, useState } from "react";
import { CartContext } from "../sessionWrapper";
import MenuItemTile from '../Menu/MenuItemTile'
import toast from "react-hot-toast";
import Image from "next/image";

const menuItems = (menuItem) => {

  const {image ,name ,description ,basePrice,
          sizes,extraIngredientsPrices } = menuItem;   

  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const {addToCart} = useContext(CartContext);

  function handleAddToCartButtonClick() {

    const hasOptions = sizes.length > 0 || extraIngredientsPrices.length > 0;

    if(hasOptions && !showPopup){
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedExtras);
    setShowPopup(false);
    toast.success('Added to cart!');
  }

  function handleExtraThingClick(ev, extraThing){
    const checked = ev.target.checked;
    if(checked){
      setSelectedExtras(prev => [...prev, extraThing]);
    }
    else{
      setSelectedExtras(prev => {
        return prev.filter(e => e.name !== extraThing.name);
      })
    }
  }

  let selectedPrice = basePrice;
  if(selectedSize){
    selectedPrice += selectedSize.price;
  }
  if(selectedExtras?.length> 0){
    for(const extra of selectedExtras){
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div 
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/80">
          <div 
            onClick={ev => ev.stopPropagation()}
            className=" my-8 bg-white p-2 rounded-lg max-w-md">
            <div 
              className="overflow-y-scroll p-2"
              style={{maxHeight: 'calc(100vh - 90px)'}}>
            <Image 
              src={image} 
              alt={name} 
              width={300} height={200} 
              className="mx-auto"/>
            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
            <p className="text-center text-gray-500 text-sm mb-2 ">{description}</p>
            {sizes?.length > 0 && (
              <div className="p-2">
                <h3 className="text-center text-gray-700 font-semibold">Pick your size</h3>
                {sizes.map((size, i) => (
                  <label key={i} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                    <input 
                      type="radio"
                      onChange={() => setSelectedSize(size)}
                      checked={selectedSize?.name === size.name} 
                      name="size"/>
                      {size.name} ₹{basePrice + size.price}
                  </label>
                ))}
              </div>
            )}
            {extraIngredientsPrices?.length > 0 && (
              <div className="p-2">
              <h3 className="text-center text-gray-700 font-semibold">Any extras?</h3>
               {extraIngredientsPrices.map((extraThing, i) => (
                <label key={i} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                  <input 
                    type="checkbox" 
                    onChange={ev => handleExtraThingClick(ev, extraThing)}
                    name={extraThing}/>
                    {extraThing.name} +₹{extraThing.price}
                </label>
              ))}
            </div>
            )}
            <button 
              onClick={handleAddToCartButtonClick}
              className="primary sticky bottom-2" 
              type="button">
                Add to cart ₹{selectedPrice}
            </button>
            <button 
              onClick={() => setShowPopup(false)}
              className="mt-2">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} 
          {...menuItem}/>
    </>
  );
};

export default menuItems;
