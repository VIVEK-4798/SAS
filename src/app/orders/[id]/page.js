'use client';
import React, { useEffect, useContext, useState } from 'react';
import SectionHeaders from "@/components/layout/sectionHeaders";
import { CartContext } from '@/components/sessionWrapper';
import { useParams } from 'next/navigation';
import AddressInput from '@/components/layout/AddressInput';

const OrderPage = () => {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null); // Set initial state as null

  useEffect(() => {
    if (window?.location?.href.includes('clear-cart=1')) {
      clearCart();
    }

    if (id) {
      fetch(`/api/orders?_id=${id}`).then(res => {
        res.json().then(orderData => {
          if (orderData.length > 0) {
            setOrder(orderData[0]);
          }
        });
      });
    }
  }, [id]);

  return (
    <section className='max-w-2xl mx-auto mt-8'>
      <div className='text-center'>
        <SectionHeaders mainHeader="Your Order"/>
        <div className='my-4'>
          <p>Thanks for your order</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>

      {order && (
        <div className='grid grid-cols-2 gap-16'>
          <div>left - products</div>
          <div>
            <div className='bg-gray-100 p-4 rounded-lg'>
              <AddressInput userInfo={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
