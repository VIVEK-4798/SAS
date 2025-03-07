"use client";
import React, { useContext, useEffect, useState } from "react";
import { CartContext, cartProductPrice } from "@/components/sessionWrapper";
import SectionHeaders from "@/components/layout/sectionHeaders";
import CartProduct from '../../components/Menu/CartProduct';
import { useSession } from "next-auth/react";
import AddressInput from '../../components/layout/AddressInput';
import toast from "react-hot-toast";
import Loader from "@/components/loader";

const CartPage = () => {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  const { data: session, status } = useSession();

  const [userInfo, setUserInfo] = useState({
    phone: "",
    streetAddress: "",
    zipCode: "",
    city: "",
    country: "",
  });

  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if(typeof window !== 'undefined'){
      if(window.location.href.includes('canceled=1')){
        toast.error('Payment failed')
      }
    }
  })

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data?.userInfo) {
            setUserInfo({
              phone: data.userInfo.phone || "",
              streetAddress: data.userInfo.streetAddress || "",
              zipCode: data.userInfo.zipCode || "",
              city: data.userInfo.city || "",
              country: data.userInfo.country || "",
            });
          }
          setProfileFetched(true);
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [status]);

  async function proceedToCheckout(ev) {
    ev.preventDefault();

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          userInfo,
          cartProducts,
        }),
      }).then(async(response) => {
        if(response.ok){
          resolve();
          window.location = await response.json();
        }else{
          reject();
        }
      });
    });
    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong... please try again later',
    })
  }  

  let subtotal = cartProducts.reduce((sum, p) => sum + cartProductPrice(p), 0);

  if (status === "loading" || !profileFetched) {
    return <Loader/>
  }

  if(cartProducts?.length === 0){
    return (
      <section className="mt-8 text-center">
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    )
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts.length === 0 ? (
            <div>No products in your shopping cart</div>
          ) : (
            cartProducts.map((product, index) => (
              <CartProduct 
                product={product} 
                onRemove={removeCartProducts} 
                key={index}/>
            ))
          )}
          <div className=" flex justify-end items-center py-4 text-right pr-14">
            <div 
              className="text-gray-500">
                Subtotal:<br/>
                Delivery:<br/>
                Total:
            </div>
            <div 
              className="font-semibold pl-2 text-right">
                ₹{subtotal}<br/>
                ₹100<br/>
                ₹{subtotal + 100}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
          <AddressInput 
            userInfo={userInfo} 
            setUserInfo={setUserInfo} />
          <button
            type="submit" 
            className="w-full !bg-green-500 !border-green-500 text-white p-2 rounded-lg mt-4">
              Pay ₹{subtotal}
          </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
