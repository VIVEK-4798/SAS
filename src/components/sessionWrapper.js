"use client";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { createContext } from "vm";

const CartContext = createContext({});

export default function SessionWrapper({ children }) {

  const [cartProducts, setCartProducts] = useState([]);

  function addTocart(product, size=null, extras=[]) {
    
  }

  return <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setCartProducts
                  }}>
              {children}
            </CartContext.Provider>
        </SessionProvider>;
}
