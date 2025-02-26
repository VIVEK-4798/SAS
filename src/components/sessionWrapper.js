"use client";
import { useState, createContext } from "react";
import { SessionProvider } from "next-auth/react";

export const CartContext = createContext({});

export default function SessionWrapper({ children }) {

  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  function saveCartProductsToLocalStorage() {
    if(ls){
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function addToCart(product, size=null, extras=[]) {
    setCartProducts(prevProducts => {
      const cartProduct = {...product, size, extras};
      const newProducts = [...prevProducts, cartProduct];
      return newProducts;
    })
  }

  return <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setCartProducts, addToCart,
                  }}>
              {children}
            </CartContext.Provider>
        </SessionProvider>
}
