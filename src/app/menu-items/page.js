'use client';
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/UseProfile'
import Link from 'next/link';
import {React, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Loader from '@/components/loader';

const MenuItemsPage = () => {

    const {loading, data} = useProfile();
    const [menuItems, setMenuItems] = useState([]);
    const [loadingImages, setLoadingImages] = useState({});

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
                console.log('menuItems', menuItems);
            })
        })
    }, [])

    const handleImageLoad = (id) => {
        setLoadingImages(prev => ({ ...prev, [id]: false }));
    };

    const handleImageError = (id) => {
        setLoadingImages(prev => ({ ...prev, [id]: false })); 
    };

    if(loading){
        return <Loader/>
    }
    if(!data){
        return 'Not an admin';
    }

  return (
    <section className='mt-8 max-w-4xl mx-auto'>
        <UserTabs isAdmin={true}/>
        <div className='mt-8'>
            <Link 
                className='button'
                href={'/menu-items/new'}>
                Create new collection items
                <FontAwesomeIcon icon={faArrowCircleRight} />
            </Link>
        </div>
        <div>
            <h2 className='text-sm text-gray-500 mt-8'>Edit collection items</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-2'>
                {menuItems?.length > 0 && menuItems.map(item => (
                    <Link
                        key={item._id}
                        href={'/menu-items/edit/'+item._id} 
                        className='bg-gray-200 rounded-lg p-4 flex flex-col justify-between h-56'>
                            
                        <div className='relative w-full h-32 overflow-hidden flex justify-center items-center'>
                            {loadingImages[item._id] ? (
                                <Loader /> 
                            ) : (
                                <Image 
                                    className='object-contain rounded-md' 
                                    src={(item.image?.[0]) || '/pizzeria-logo.jpg'} 
                                    alt={item.name}
                                    layout="fill"
                                    onLoad={() => handleImageLoad(item._id)}
                                    onError={() => handleImageError(item._id)}
                                    />
                            )}
                        </div>

                        <div className='text-center font-semibold mt-2'>
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  )
}

export default MenuItemsPage;
