"use client";

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { CartContext } from '../sessionWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

function AuthLinks({ status, userName }) {
  if (status === 'authenticated') {
    return (
      <>
        <Link
          href={'/profile'}
          className="whitespace-nowrap font-medium hover:text-cocoa"
        >
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link
          href={'/register'}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Register
        </Link>
      </>
    );
  }
}

const Header = ({ overlay = false }) => {
  const { data: session, status } = useSession();
  const userData = session?.user;
  let userName = userData?.name;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (userName?.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <header className={`${overlay ? 'absolute top-0 left-0 w-full z-50' : 'relative w-full'}`}>
      <div className="max-w-7xl mx-auto p-4">
        {/* Mobile Navbar */}
        <div className="flex items-center md:hidden justify-between">
          <Link
            className="text-primary font-bold text-2xl flex items-center"
            href="/"
          >
            <Image
              src={'/sas-logo.jpg'}
              width={50}
              height={50}
              alt="sas-logo"
              className="rounded-full"
            />
            SAS
          </Link>
          <div className="flex gap-5 items-center">
            <Link className="relative text-xl" href={'/cart'}>
              <FontAwesomeIcon icon={faCartShopping} className="text-gray-900" />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary text-white rounded-full text-xs py-1 px-2 leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <button
              className="p-1 rounded-md"
              onClick={() => setMobileNavOpen((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileNavOpen && (
          <div
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden p-4 bg-gray-100 rounded-lg mt-4 flex flex-col gap-2 text-center"
          >
            <Link href={'/'}>Home</Link>
            <Link href={'/menu'}>Collection</Link>
            <Link href={'/#faq'}>Faqs</Link>
            <Link href={'/#contact'}>Contact</Link>
            <AuthLinks status={status} userName={userName} />
          </div>
        )}

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between">
          <Link
            className="text-primary font-bold text-2xl gap-2 flex items-center"
            href="/"
          >
            <Image
              src={'/sas-logo.jpg'}
              width={50}
              height={50}
              alt="sas-logo"
              className="rounded-full"
            />
            SAS
          </Link>
          <nav className="flex items-center gap-8 text-gray-900 font-semibold">
            <Link href={'/'} className="hover:text-cocoa hover:underline">
              Home
            </Link>
            <Link href={'/menu'} className="hover:text-cocoa hover:underline">
              Collection
            </Link>
            <Link href={'/#faq'} className="hover:text-cocoa hover:underline">
              Faqs
            </Link>
            <Link href={'/#contact'} className="hover:text-cocoa hover:underline">
              Contact
            </Link>
          </nav>
          <nav className="flex items-center gap-4 text-gray-900">
            <AuthLinks status={status} userName={userName} />
            <Link className="relative text-xl" href={'/cart'}>
              <FontAwesomeIcon icon={faCartShopping} className="hover:text-cocoa" />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary text-white rounded-full text-xs py-1 px-2 leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
