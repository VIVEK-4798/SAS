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
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [orderCount, setOrderCount] = useState(0);

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

      fetch("/api/coupons")
        .then(res => res.json())
        .then(data => setCoupons(data));

      fetch("/api/orders")
        .then(res => res.json())
        .then(data => setOrderCount(data?.orders?.length || 0))
        .catch(err => console.error("Failed to fetch orders", err));
    }
  }, [status]);

  async function proceedToCheckout(ev) {
    ev.preventDefault();

    if (paymentMethod === "cod") {
      const promise = new Promise((resolve, reject) => {
        fetch('/api/cod-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userInfo,
            cartProducts,
            couponDiscount: selectedCoupon?.discountAmount || 0
          }),
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
        body: JSON.stringify({
          userInfo,
          cartProducts,
          couponDiscount: selectedCoupon?.discountAmount || 0
        }),
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
let extraDiscounts = cartProducts.reduce((sum, p) => sum + (p.extraIngredientsPrices?.[0]?.price || 0), 0);

let couponDiscountOnly = 0;
let totalDiscount = extraDiscounts; // For display only

if (selectedCoupon) {
  const name = selectedCoupon.name;
  const discount = selectedCoupon.discountAmount;

  const isEligible =
    (name === "SAVE100" && subtotal >= 999) ||
    (name === "BIGSAVE200" && subtotal >= 1999) ||
    (name === "WELCOME50" && orderCount === 0) ||
    (!['SAVE100', 'BIGSAVE200', 'WELCOME50'].includes(name));

  if (isEligible) {
    couponDiscountOnly = discount;
    totalDiscount += discount;
  }
}

let totalAfterCoupon = subtotal - couponDiscountOnly;


  if (status === "loading" || !profileFetched) return <Loader />;

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

          {/* Coupon Dropdown */}
          <div className="mb-4 mt-4">
            <label htmlFor="coupon" className="block mb-1 font-medium text-gray-700">
              Apply Coupon
            </label>
            <select
              id="coupon"
              className="w-full border p-2 rounded"
              value={selectedCoupon?._id || ""}
              onChange={(e) => {
                const selectedId = e.target.value;
                const coupon = coupons.find(c => c._id === selectedId);
                if (!coupon) return;

                if (coupon.name === "SAVE100" && subtotal < 999) {
                  toast.error("SAVE100 requires a minimum subtotal of ₹999");
                  return;
                }
                if (coupon.name === "BIGSAVE200" && subtotal < 1999) {
                  toast.error("BIGSAVE200 requires a minimum subtotal of ₹1999");
                  return;
                }
                if (coupon.name === "WELCOME50" && orderCount > 0) {
                  toast.error("WELCOME50 is only for first-time customers");
                  return;
                }

                setSelectedCoupon(coupon);
              }}
            >
              <option value="">Select a Coupon</option>
              {coupons.map((coupon) => {
                const isDisabled =
                  (coupon.name === "SAVE100" && subtotal < 999) ||
                  (coupon.name === "BIGSAVE200" && subtotal < 1999) ||
                  (coupon.name === "WELCOME50" && orderCount > 0);
                return (
                  <option
                    key={coupon._id}
                    value={coupon._id}
                    disabled={isDisabled}
                  >
                    {coupon.name} - ₹{coupon.discountAmount} off {isDisabled ? "(Not eligible)" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-end items-center py-4 text-right pr-14">
            <div className="text-gray-500">
              Subtotal:<br />Delivery:<br />Total Discount:<br />Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ₹{subtotal}<br />Free<br />
              - ₹{totalDiscount}<br />
              ₹{totalAfterCoupon}
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
              {paymentMethod === 'online' ? `Pay ₹${totalAfterCoupon}` : `Place Order (COD)`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
