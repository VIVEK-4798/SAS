import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';


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
        <div className='flex items-center gap-4'>
          <button className='flex items-center bg-primary text-white
          px-5 py-2 rounded-full text-sm'>
            ORDER NOW
            <FontAwesomeIcon
              icon={faArrowCircleRight}
              className="ml-2 w-4"
            />
          </button>
          <button className='flex items-center gap-2 py-2
           text-gray-600 font-semibold text-sm'>
            Learn more
            <FontAwesomeIcon
              icon={faArrowCircleRight}
              className="ml-2 w-4"
            />
          </button>
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