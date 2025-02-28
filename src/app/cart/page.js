"use client";
import React, { useContext } from 'react';
import { CartContext } from '@/components/sessionWrapper';
import SectionHeaders from '@/components/layout/sectionHeaders';
import Image from 'next/image';

const CartPage = () => {

  const {cartProducts} = useContext(CartContext);  

  return (
    <section className='mt-8'>
      <div className='text-center'>
        <SectionHeaders mainHeader="Cart"/>
      </div>
      <div className='grid gap-4 grid-cols-2 mt-4'>
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product,i) => (
            <div key={i} className='flex items-center gap-4 mb-2 border-b py-2'>
              <div className='w-24'>
                <Image src={product.image} width={240} height={240} alt=''/>
              </div>
              <div>
                <h3>{product.name}</h3>
                
                {product.size && (
                  <div>Size: <span>{product.size.name}</span></div>
                )}
              </div>
              </div>
          ))}
        </div>
        <div>right</div>
      </div>
    </section>
  )
}

export default CartPage