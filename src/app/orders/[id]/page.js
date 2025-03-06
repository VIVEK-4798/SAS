'use client';
import React, { useEffect, useContext, useState } from 'react';
import SectionHeaders from "@/components/layout/sectionHeaders";
import { CartContext, cartProductPrice } from '@/components/sessionWrapper';
import { useParams } from 'next/navigation';
import AddressInput from '@/components/layout/AddressInput';
import CartProduct from '@/components/Menu/CartProduct';

const OrderPage = () => {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null); 

  useEffect(() => {
    if (window?.location?.href.includes('clear-cart=1')) {
      clearCart();
    }

    if (id) {
      fetch('/api/orders?_id='+id).then(res => {
        res.json().then(orderData => {
          console.log(orderData);
            setOrder(orderData);
        });
      });
    }
  }, [id]);

  let subtotal = 0;
  if(order?.cartProducts){
    for(const product of order?.cartProducts){
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className='max-w-2xl mx-auto mt-8'>
      <div className='text-center'>
        <SectionHeaders mainHeader="Your Order"/>
        <div className='mt-4 mb-8'>
          <p>Thanks for your order</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>

      {order && (
        <div className='grid grid-cols-2 gap-16'>
          <div>
            {order.cartProducts.map((product, index) => (
              <CartProduct key={product._id || index} product={product} />
          ))}
          <div>
            <div className='text-right py-2 text-gray-500'>
              Subtotal:
              <span 
                className='text-black font-bold inline-block w-11 ml-1'>
                  ₹{subtotal}
              </span><br/>
              Delivery:
              <span 
                className='text-black font-bold inline-block w-11 ml-1'>
                  ₹100
              </span><br/>
              Total:
              <span 
                className='text-black font-bold inline-block w-11 ml-1'>
                  ₹{subtotal + 100}
              </span><br/>
            </div>
          </div>
          </div>
          <div>
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
