"use client";
import React, { useContext } from 'react';
import { CartContext, cartProductPrice } from '@/components/sessionWrapper';
import SectionHeaders from '@/components/layout/sectionHeaders';
import Image from 'next/image';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CartPage = () => {

  const {cartProducts, removeCartProducts} = useContext(CartContext); 
  let total = 0;
  for(const p of cartProducts){
    total += cartProductPrice(p);
  } 

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
          {cartProducts?.length > 0 && cartProducts.map((product,index) => (
            <div key={index} className='flex items-center gap-4 mb-2 border-b py-2'>
              <div className='w-24'>
                <Image src={product.image} width={240} height={240} alt=''/>
              </div>
              <div className='grow'>
                <h3 className='font-semibold'>{product.name}</h3>
                {product.size && (
                  <div className='text-sm'>Size: <span>{product.size.name}</span></div>
                )}
                {product.extras?.length > 0 && (
                  <div className='text-sm text-gray-500'>
                    {product.extras.map((extra, i) => (
                      <div key={i}>{extra.name} ₹{extra.price}</div>
                    ))}
                  </div>
                )}
              </div>
                <div className='text-lg font-semibold'>
                  {cartProductPrice(product)}
                </div>
                <div className='ml-2'>
                  <button 
                    type='button'
                    onClick={() => removeCartProducts(index)}
                    className='p-2'>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
          ))}
          <div className='py-4 text-right pr-14'>
            <span className='text-gray-500'>Subtotal:</span>
            <span className='text-lg font-semibold pl-2'>
                    ₹{total}
                   </span>
          </div>
        </div>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <h2>Checkout</h2>
          <form>
            <button type='submit'>
              Pay ₹{total}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CartPage