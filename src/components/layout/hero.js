import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';


const hero = () => {
  return (
    <section className="grid grid-cols-custom gap-8">
  <div className="py-12">
    <h1 className="text-4xl font-semibold leading-tight">
    For Every Mood, There's a&nbsp;
    <span className='text-primary'>Pizza</span>
    </h1>
    <p className="my-6 text-gray-500 text-sm">
        Discover the joy of freshly baked pizzas crafted to 
        perfection. Whether it’s a celebration, comfort meal,
        or quick bite, every slice brings happiness to your
        day
    </p>
    <div className="flex items-center gap-4">
      <button className="flex items-center bg-primary text-white px-5 py-2 rounded-full text-sm">
        ORDER NOW
        <FontAwesomeIcon
          icon={faArrowCircleRight}
          className="ml-2 w-4"
        />
      </button>
      <button className="flex items-center gap-2 py-2 text-gray-600 font-semibold text-sm">
        Learn more
        <FontAwesomeIcon
          icon={faArrowCircleRight}
          className="ml-2 w-4"
        />
      </button>
    </div>
  </div>

   <div className="relative">
    <Image
      src="/pizza.png"
      layout="fill"
      objectFit="contain"
      alt="pizza"
    />
  </div>
</section>

  )
}

export default hero