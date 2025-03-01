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

  // Fetch user profile
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

  let total = cartProducts.reduce((sum, p) => sum + cartProductPrice(p), 0);

  if (status === "loading" || !profileFetched) {
    return <p>Loading...</p>;
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="grid gap-4 grid-cols-2 mt-4">
        {/* Cart Items */}
        <div>
          {cartProducts.length === 0 ? (
            <div>No products in your shopping cart</div>
          ) : (
            cartProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4 mb-2 border-b py-2">
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
                  {cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button type="button" onClick={() => removeCartProducts(index)} className="p-2">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="py-4 text-right pr-14">
            <span className="text-gray-500">Subtotal:</span>
            <span className="text-lg font-semibold pl-2">₹{total}</span>
          </div>
        </div>

        {/* Checkout Section with Address Form */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <AddressInput userInfo={userInfo} setUserInfo={setUserInfo} />
          <button className="w-full bg-green-500 text-white p-2 rounded mt-4">
            Pay ₹{total}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
