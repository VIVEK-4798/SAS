'use client';
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/UseProfile'
import Link from 'next/link';
import {React, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const MenuItemsPage = () => {

    const {loading, data} = useProfile();
    const [menuItems, setMenuItems] = useState('');

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            })
        })
    }, [])

    if(loading){
        return 'Loading user info...';
    }
    if(!data){
        return 'Not an admin';
    }

  return (
    <section className='mt-8 max-w-md mx-auto'>
        <UserTabs isAdmin={true}/>
        <div className='mt-8'>
            <Link 
                className='button'
                href={'/menu-items/new'}>
                Create new menu items
                <FontAwesomeIcon
                    icon={faArrowCircleRight}
                />
            </Link>
        </div>
        <div>
            <h2 className='text-sm text-gray-500 mt-8'>Edit menu items</h2>
            <div className='grid grid-cols-3 gap-2 mt-2'>
                {menuItems?.length > 0 && menuItems.map(item => (
                    <Link
                        key={item._id}
                        href={'/menu-items/edit/'+item._id} 
                        className='bg-gray-200 rounded-lg p-4 flex-col'>
                            <div className='relative'>
                                <Image 
                                    className='rounded-md'
                                    src={item.image} alt={''}
                                    width={200} height={200}/>
                            </div>
                        <div className='text-center'>
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  )
}

export default MenuItemsPage