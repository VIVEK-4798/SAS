'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import MenuItems from '../Menu/menuItems';
import SectionHeaders from '../layout/sectionHeaders';

const homeMenu = () => {

  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        const bestSellers = menuItems.slice(-3);
          setBestSellers(bestSellers);        
      })
    })
  }, []);

  return (
    <section>
        <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={'/sallad1.png'} width={109} height={189}  alt={'sallad'} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'} />
        </div>
      </div>
    <div className='text-center mb-4'>
       <SectionHeaders
          subHeader ={'check out'}
          mainHeader = {'Our Best Sellers'}
       />
    </div>
    <div className='grid sm:grid-cols-3 gap-4'>
      {bestSellers?.length > 0 && bestSellers.map((item, index) => (
        <MenuItems {...item} key={index}/>
      ))}
    </div>
    </section>
  )
}

export default homeMenu