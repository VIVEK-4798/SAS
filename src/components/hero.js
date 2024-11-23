import React from 'react';
import Image from 'next/image';

const hero = () => {
  return (
    <section className='grid grid-cols-2'>
      <div>
      <h1 className='text-4xl font-semibold'>
      Savor the Perfect Slice, Anytime You Crave It
      </h1>
        <p className='my-4 text-gray-500'>
        Discover the joy of freshly baked pizzas crafted to
         perfection. Whether it’s a celebration, a comfort 
         meal, or a quick bite, every slice is made to bring 
         happiness to your day.
        </p>
        <div>
          <button className='bg-primary text-white
          px-8 py-2 rounded-full'>
            Order now</button>
          <button>Learn more</button>
        </div>
      </div>
        <div className='relative'>
        <Image src={'/pizza.png'} 
            layout={'fill'}
            objectFit={'contain'}
            alt={'pizza'}/>
        </div>
    </section>
  )
}

export default hero