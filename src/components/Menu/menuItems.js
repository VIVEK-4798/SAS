import React, { useContext, useState } from "react";
import { CartContext } from "../sessionWrapper";
import MenuItemTile from '../Menu/MenuItemTile'
import toast from "react-hot-toast";

const menuItems = (menuItem) => {

  const {image ,name ,description ,basePrice,
          sizes,extraIngredeientsPrices} = menuItem;

  const [showPopup, setShowPopup] = useState(false);
  const {addToCart} = useContext(CartContext);

  function handleAddToCartButtonClick() {
    if(sizes.length === 0 && extraIngredeientsPrices.length === 0){
      addToCart(menuItem);
      toast.success('Added to cart!');
    }
    else{
      setShowPopup(true);
    }
  }

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80">
          <div className="bg-white p-4 rounded-lg">
            
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} 
          {...menuItem}/>
    </>
  );
};

export default menuItems;
