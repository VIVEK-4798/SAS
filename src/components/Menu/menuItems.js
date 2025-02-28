import React, { useContext, useState } from "react";
import { CartContext } from "../sessionWrapper";
import MenuItemTile from '../Menu/MenuItemTile'
import toast from "react-hot-toast";
import Image from "next/image";

const menuItems = (menuItem) => {

  const {image ,name ,description ,basePrice,
          sizes,extraIngredientsPrices } = menuItem;   

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const {addToCart} = useContext(CartContext);

  function handleAddToCartButtonClick() {
    if(sizes.length === 0 && extraIngredientsPrices.length === 0){
      addToCart(menuItem);
      toast.success('Added to cart!');
    }
    else{
      setShowPopup(true);
    }
  }

  function handleExtraThingClick(ev){
    const checked = ev.target.checked;
    if(checked){
      setSelectedExtras(prev => [...prev, extraThing]);
    }
    else{
      setSelectedExtras()
    }
  }

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80">
          <div className=" my-8 bg-white p-2 rounded-lg max-w-md">
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
              <h3 className="text-center text-gray-700 font-semibold">Pick your size</h3>
              {extraIngredientsPrices.map((extraThing, i) => (
                <label key={i} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                  <input 
                    type="checkbox" 
                    onChange={handleExtraThingClick}
                    name={extraThing}/>
                    {extraThing.name} +₹{extraThing.price}
                </label>
              ))}
            </div>
            )}
            <button className="primary" type="button">Add to cart "selected price"</button>
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
