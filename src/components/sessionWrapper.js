"use client";
import { useState, createContext, useEffect} from "react";
import { SessionProvider } from "next-auth/react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice || 0;  // Ensure basePrice is always a number

  if (cartProduct.size && typeof cartProduct.size.price === "number") {
    price += cartProduct.size.price;
  }

  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      if (typeof extra.price === "number") {
        price += extra.price;
      }
    }
  }

  return isNaN(price) ? 0 : price;  // Prevent NaN errors
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
  }, []);

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
