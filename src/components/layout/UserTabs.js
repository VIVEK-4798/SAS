"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const UserTabs = ({ isAdmin }) => {
  const path = usePathname();    

  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      <Link 
        className={path === '/profile' ? 'active' : ''} 
        href="/profile">
        Profile
      </Link>

      {isAdmin && (
        <>
          <Link 
            href="/categories"
            className={path === '/categories' ? 'active' : ''}>
            Categories
          </Link>
          <Link 
            href="/menu-items"
            className={path.includes('menu-items') ? 'active' : ''}>
            Collection Items
          </Link>
          <Link 
            href="/users"
            className={path.includes('/users') ? 'active' : ''}>
            Users
          </Link>
          <Link 
            href="/contact"
            className={path === '/contact' ? 'active' : ''}>
            Feedback
          </Link>
        </>
      )}

      <Link 
        href="/orders"
        className={path === '/orders' ? 'active' : ''}>
        Orders
      </Link>
    </div>
  );
};

export default UserTabs;
