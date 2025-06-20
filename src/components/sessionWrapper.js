"use client";
import { useState, createContext, useEffect} from "react";
import { SessionProvider } from "next-auth/react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice || 0;

  if (cartProduct.size && typeof cartProduct.size.price === "number") {
    price += cartProduct.size.price;
  }

  if (Array.isArray(cartProduct.extras) && cartProduct.extras.length > 0) {
    for (const extra of cartProduct.extras) {
      if (typeof extra.price === "number") {
        price += extra.price;
      }
    }
  }

  // ✅ Apply discount if available in extraIngredientsPrices
  if (
    Array.isArray(cartProduct.extraIngredientsPrices) &&
    cartProduct.extraIngredientsPrices.length > 0
  ) {
    const discount = cartProduct.extraIngredientsPrices[0];
    if (typeof discount?.price === "number") {
      price -= discount.price;
    }
  }

  // Ensure no negative pricing
  return isNaN(price) ? 0 : Math.max(0, price);
}



export default function SessionWrapper({ children }) {

  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  function saveCartProductsToLocalStorage(cartProducts) {
    if(ls){
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  useEffect(() => {
    if(ls && ls.getItem('cart')){
      setCartProducts( JSON.parse(ls.getItem('cart')));
    }
  }, [ls]);

  function removeCartProducts(indexToRemove) {
    setCartProducts(prevCartProducts => {
      const newCartProducts = prevCartProducts.filter((v, index) => 
        index !== indexToRemove);
      saveCartProductsToLocalStorage(newCartProducts); 
      return newCartProducts;
    });
    toast.success('Product removed');
  }

  function clearCart (){
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function addToCart(product, size=null, extras=[]) {
    setCartProducts(prevProducts => {
      const cartProduct = {...product, size, extras};
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  return <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setCartProducts, addToCart,
                removeCartProducts, clearCart}}>
              {children}
            </CartContext.Provider>
        </SessionProvider>
}
