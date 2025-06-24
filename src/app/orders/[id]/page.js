'use client'
import React, { useEffect, useContext, useState, useRef } from 'react';
import SectionHeaders from "@/components/layout/sectionHeaders";
import { CartContext, cartProductPrice } from '@/components/sessionWrapper';
import { useParams } from 'next/navigation';
import AddressInput from '@/components/layout/AddressInput';
import CartProduct from '@/components/Menu/CartProduct';
import Loader from '@/components/loader';

const OrderPage = () => {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null); 
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);
  const hasClearedCart = useRef(false); // Prevent multiple calls

  useEffect(() => {
    if (window?.location?.href.includes('clear-cart=1') && !hasClearedCart.current) {
      clearCart();
      hasClearedCart.current = true;
    }

    if (!id) return;

    const fetchOrder = async () => {
      try {
        setLoadingOrders(true);
        const res = await fetch('/api/orders?_id=' + id);
        if (!res.ok) throw new Error("Failed to fetch order");
        const orderData = await res.json();
        console.log("Fetched order data:", orderData);
        
        setOrder(orderData);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order. Please try again.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrder();
  }, [id]); 

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  const couponDiscount = order?.couponDiscount || 0;
  const finalTotal = subtotal - couponDiscount;

  return (
    <section className='max-w-4xl mx-auto mt-8'>
      <div className='text-center'>
        <SectionHeaders mainHeader="Your Order" />
        <div className="mt-4 mb-8">
          <p className="text-lg font-semibold">Thank you for shopping with SAS!</p>
          <p className="text-gray-700">Your order has been placed successfully. You’ll receive updates once your items are packed and shipped.</p>
        </div>
      </div>

      {loadingOrders && <Loader />}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {order && (
        <div className='grid md:grid-cols-2 md:gap-16'>
          <div className='max-md:mb-8'>
            {order.cartProducts.map((product, index) => (
              <CartProduct key={product._id || index} product={product} />
            ))}
            <div className='text-right py-2 text-gray-500'>
              <p>Subtotal: ₹{subtotal}</p>
              <p>Delivery: Free</p>
              {couponDiscount > 0 && (
                <p className="text-green-600">Coupon Discount: - ₹{couponDiscount}</p>
              )}
              <p className="font-semibold text-black mt-1">Total: ₹{finalTotal}</p>
            </div>
            <div className="my-4">
              <h3 className="text-lg font-semibold mb-2">Payment Status:</h3>
              {order.paid ? (
                <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Paid (Online)
                </span>
              ) : (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                  Cash on Delivery
                </span>
              )}
            </div>
          </div>
          
          <div>
            <h2 className='font-semibold mb-1 text-gray-700 text-lg max-md:ml-1'>Delivery address</h2>
            <div className='bg-gray-100 p-4 rounded-lg'>
              <AddressInput disabled={true} userInfo={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
