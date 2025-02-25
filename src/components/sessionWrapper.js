"use client";
import { useState, createContext } from "react";
import { SessionProvider } from "next-auth/react";

const CartContext = createContext({});

export default function SessionWrapper({ children }) {

  const [cartProducts, setCartProducts] = useState([]);

  function addTocart(product, size=null, extras=[]) {
    setCartProducts(prevProducts => {
      const cartProduct = {...product, size, extras};
      const newProducts = [...prevProducts, cartProduct];
      return newProducts;
    })
  }

  return <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setCartProducts
                  }}>
              {children}
            </CartContext.Provider>
        </SessionProvider>
}
