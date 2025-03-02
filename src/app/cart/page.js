"use client";
import React, { useContext, useEffect, useState } from "react";
import { CartContext, cartProductPrice } from "@/components/sessionWrapper";
import SectionHeaders from "@/components/layout/sectionHeaders";
import Image from "next/image";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import AddressInput from '../../components/layout/AddressInput';

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
    const response = await fetch('/api/checkout', {
      method: 'POST',
      heades: {'Content-Type':'application/json'},
      body: JSON.stringify({
        userInfo,
        cartProducts
      }),
    });
    // const link = await  response.json();
    // window.location = link;
  }

  let subtotal = cartProducts.reduce((sum, p) => sum + cartProductPrice(p), 0);

  if (status === "loading" || !profileFetched) {
    return <p>Loading...</p>;
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
              <div key={index} className="flex items-center gap-4 border-b py-4">
                <div className="w-24">
                  <Image src={product.image} width={240} height={240} alt="" />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && <div className="text-sm">Size: <span>{product.size.name}</span></div>}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extras.map((extra, i) => (
                        <div key={i}>{extra.name} ₹{extra.price}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                ₹{cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button type="button" onClick={() => removeCartProducts(index)} className="p-2">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
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
