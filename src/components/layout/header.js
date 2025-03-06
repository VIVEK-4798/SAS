"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import React, { useContext } from 'react';
import { CartContext } from '../sessionWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const header = () => {

  const { data: session, status } = useSession();  

  const userData = session?.user;  
  let userName = userData?.name; 
  const {cartProducts} = useContext(CartContext);

   if(userName?.includes(' ')){
    userName = userName.split(' ')[0];
   }

  console.log("Session Status:", status);

  return (
    <header >
      <div className='hidden md:flex items-center justify-between'>
      <Link className='text-primary font-semibold text-2xl' href="/">
          Pizzeria
        </Link>
        <nav className='flex items-center gap-8 text-gray-500 font-semibold'>
            <Link href={'/'}>Home</Link>
            <Link href={'/menu'}>Menu</Link>
            <Link href={'/#about'}>About</Link>
            <Link href={'/#contact'}>Contact</Link>
        </nav>
        <nav className='flex items-center gap-4 text-gray-500'>
          {status === 'authenticated' && (
            <>
            <Link href={'/profile'} className='whitespace-nowrap'>
              Hello, {userName}
            </Link>
              <button
              onClick={() => signOut()}
              className='bg-primary
              rounded-full text-white px-8 py-2'>
              Logout
              </button>
            </>
          )}
          {status === 'unauthenticated' && (
            <>
              <Link href={'/login'}>Login</Link>
              <Link href={'/register'} className='bg-primary
              rounded-full text-white px-8 py-2'>
                Register
              </Link>
            </>
          )}
            <Link 
              className='relative text-xl'
              href={'/cart'}>
                <FontAwesomeIcon icon={faCartShopping} /> 
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