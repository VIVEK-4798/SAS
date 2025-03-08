"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import React, { useContext, useState} from 'react';
import { CartContext } from '../sessionWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

function AuthLinks({status, userName}) {
  if (status === 'authenticated') {
    return (
      <>
    <Link href={'/profile'} className='whitespace-nowrap font-medium hover:text-gray-700'>
      Hello, {userName}
    </Link>
      <button
      onClick={() => signOut()}
      className='bg-primary
      rounded-full text-white px-8 py-2'>
      Logout
      </button>
    </>
    )
  }
  if (status === 'unauthenticated') {
    return (
      <>
      <Link href={'/login'}>Login</Link>
      <Link href={'/register'} className='bg-primary
      rounded-full text-white px-8 py-2'>
        Register
      </Link>
    </>
    )
  }
}

const header = () => {

  const { data: session, status } = useSession();  

  const userData = session?.user;  
  let userName = userData?.name; 
  const {cartProducts} = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

   if(userName?.includes(' ')){
    userName = userName.split(' ')[0];
   }

  console.log("Session Status:", status);

  return (
    <header>
      <div className='flex items-center md:hidden justify-between'>
      <Link className='text-primary font-semibold text-2xl flex items-center' href="/">
      <Image src={'/pizzeria-logo.jpg'} width={50} height={50} alt='pizzeria-logo'/>
          Pizzeria
        </Link>
        <div className='flex gap-5 items-center'>
        <Link 
          className='relative text-xl'
            href={'/cart'}>
            <FontAwesomeIcon icon={faCartShopping} className='text-gray-500'/> 
              {cartProducts?.length > 0 && (
                <span 
                  className='absolute -top-2 -right-3 bg-primary text-white 
                  rounded-full text-xs py-1 px-2 leading-3'>
                    {cartProducts.length}
                </span>
                )}
            </Link>
            <button 
              className='p-1 rounded-md' 
              onClick={() => setMobileNavOpen(prev => !prev)}>
              <FontAwesomeIcon icon={faBars} />
            </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)} 
          className='md:hidden p-4 bg-gray-100 rounded-lg mt-4 flex 
            flex-col gap-2 text-center'>
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>
        <AuthLinks status={status} userName={userName}/>
        </div>
      )}
      <div className='hidden md:flex items-center justify-between'>
      <Link className='text-primary font-semibold text-2xl flex items-center' href="/">
        <Image src={'/pizzeria-logo.jpg'} width={50} height={50} alt='pizzeria-logo'/>
          Pizzeria
        </Link>
        <nav className='flex items-center gap-8 text-gray-500 font-semibold '>
            <Link href={'/'} className='hover:text-gray-700 hover:underline'>Home</Link>
            <Link href={'/menu'} className='hover:text-gray-700 hover:underline'>Menu</Link>
            <Link href={'/#about'} className='hover:text-gray-700 hover:underline'>About</Link>
            <Link href={'/#contact'} className='hover:text-gray-700 hover:underline'>Contact</Link>
        </nav>
        <nav className='flex items-center gap-4 text-gray-500'>
          <AuthLinks status={status} userName={userName}/>
            <Link 
              className='relative text-xl'
              href={'/cart'}>
                <FontAwesomeIcon icon={faCartShopping} className='hover:text-gray-600'/> 
                {cartProducts?.length > 0 && (
                  <span 
                  className='absolute -top-2 -right-3 bg-primary text-white 
                            rounded-full text-xs py-1 px-2 leading-3'>
                    {cartProducts.length}
                </span>
                )}
            </Link>
        </nav>
      </div>
    </header>
  )
}

export default header