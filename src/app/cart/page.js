"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext, cartProductPrice } from "@/components/sessionWrapper";
import SectionHeaders from "@/components/layout/sectionHeaders";
import CartProduct from '../../components/Menu/CartProduct';
import { useSession } from "next-auth/react";
import AddressInput from '../../components/layout/AddressInput';
import toast from "react-hot-toast";
import Loader from "@/components/loader";
import { motion } from 'framer-motion';
import Link from "next/link";
import Script from 'next/script';

const CartPage = () => {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    phone: "",
    streetAddress: "",
    zipCode: "",
    city: "",
    country: "",
  });

  const [profileFetched, setProfileFetched] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.href.includes('canceled=1')) {
      toast.error('Payment failed');
    }
  }, []);

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

    if (paymentMethod === "cod") {
      const promise = new Promise((resolve, reject) => {
        fetch('/api/cod-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userInfo, cartProducts }),
        }).then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            resolve();
            window.location.href = `/orders/${data.orderId}?clear-cart=1`;
          } else {
            reject();
          }
        });
      });

      await toast.promise(promise, {
        loading: 'Placing your order...',
        success: 'Order placed successfully!',
        error: 'Failed to place order, try again.',
      });
      return;
    }

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInfo, cartProducts }),
      }).then(async (response) => {
        if (response.ok) {
          const orderData = await response.json();
          resolve();
          openRazorpay(orderData);
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Opening payment...',
      error: 'Something went wrong... please try again later',
    });
  }

  function openRazorpay(order) {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "SAS Store",
      description: "Complete your order",
      order_id: order.razorpayOrderId,
      handler: async function (response) {
        const res = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order.orderId,
          }),
        });

        const data = await res.json();
        if (data.success) {
          window.location.href = `/orders/${order.orderId}?clear-cart=1`;
        } else {
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: session?.user?.name || '',
        email: session?.user?.email || '',
      },
      theme: { color: "#16a34a" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  let subtotal = cartProducts.reduce((sum, p) => sum + cartProductPrice(p), 0);

  if (status === "loading" || !profileFetched) return <Loader />;

  if (cartProducts?.length === 0) {
    return (
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto mt-12 text-center"
      >
        <div className="bg-[#f7e8d5] rounded-xl p-8 shadow-sm border border-[#f8d7ac]">
          <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart feels light</h3>
          <p className="text-gray-500 mb-6">No items in your cart yet. Let&apos;s find something special!</p>
          <Link href="/menu" className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200">
            Browse Menu
          </Link>
        </div>
      </motion.section>
    );
  }

  return (
    <section className="mt-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 md:grid gap-8 grid-cols-2">
        <div>
          {cartProducts.map((product, index) => (
            <CartProduct product={product} onRemove={removeCartProducts} key={index} index={index} />
          ))}
          <div className="flex justify-end items-center py-4 text-right pr-14">
            <div className="text-gray-500">
              Subtotal:<br />Delivery:<br />Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ₹{subtotal}<br />Free<br />₹{subtotal + 0}
            </div>
          </div>
        </div>
        <div className="bg-[#f7e8d5] border border-[#f8d7ac] p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInput userInfo={userInfo} setUserInfo={setUserInfo} />

            <div className="flex flex-col gap-2 my-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
                Pay Online (Razorpay)
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                Cash on Delivery (COD)
              </label>
            </div>

            <button type="submit" className="w-full !bg-green-500 !border-green-500 text-white p-2 rounded-lg mt-4">
              {paymentMethod === 'online' ? `Pay ₹${subtotal}` : `Place Order (COD)`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
