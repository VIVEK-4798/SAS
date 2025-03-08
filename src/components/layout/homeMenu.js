'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import MenuItems from '../Menu/menuItems';
import SectionHeaders from '../layout/sectionHeaders';
import Loader from '../../components/loader';

const HomeMenu = () => {

  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        const bestSellers = menuItems.slice(-9);
          setBestSellers(bestSellers); 
          setLoading(false);       
      })
    })
  }, []);

  if(loading){
    return <Loader/>
  }

  return (
    <section>
        <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image 
            src={'/sallad1.png'} 
            width={109} height={189}  
            className="md:w-[160px] md:h-[260px]" 
            alt={'sallad'} 
          />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image 
            src={'/sallad2.png'} 
            width={107} height={195}  
            className="md:w-[160px] md:h-[260px]"  
            alt={'sallad'} 
          />
        </div>
      </div>
    <div className='text-center mb-4'>
       <SectionHeaders
          subHeader ={'check out'}
          mainHeader = {'Our Best Sellers'}
       />
    </div>
    {!loading && (
      <div className='grid sm:grid-cols-3 gap-4'>
      {bestSellers?.length > 0 && bestSellers.map((item, index) => (
        <MenuItems {...item} key={index}/>
      ))}
    </div>
    )}
    </section>
  )
}

export default HomeMenu
