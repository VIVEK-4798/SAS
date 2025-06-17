'use client';
import { useProfile } from '@/components/UseProfile'
import {React, useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import UserTabs from '@/components/layout/UserTabs';
import Link from 'next/link';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from "react-hot-toast";
import MenuItemForm from '@/components/layout/MenuItemForm';
import Loader from '@/components/loader';

const NewMenuItemPage = () => {

    const {loading, data} = useProfile();
    const [redirectToItems, setRedirectToItems] = useState(false);

    async function handleFormSubmit(ev, data) { 
        ev.preventDefault();
    
        const savingPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/menu-items', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'content-type': 'application/json' },
                });
    
                if (response.ok) {
                    resolve();
                } else {
                    const errorData = await response.json(); 
                    reject(new Error(errorData.error || "Failed to save menu item"));
                }
            } catch (err) {
                reject(new Error("Network error or server issue"));
            }
        });
    
        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item...',
            success: 'Saved',
            error: (err) => err.message || 'Error saving item',
        });
    
        setRedirectToItems(true); 
    }
    
    const router = useRouter();

    useEffect(() => {
        if (redirectToItems) {
            router.push('/menu-items'); 
        }
    }, [redirectToItems, router]);
    
    

    if(loading){
        return <Loader/>
    }
    if(!data){
        return 'Not an admin';
    }

  return (
    <section className='mt-8 '>
        <UserTabs isAdmin={true}/>
        <div className='max-w-2xl mx-auto mt-8'>
            <Link
                href={'/menu-items'}
                className='button'>
                <FontAwesomeIcon
                    icon={faArrowCircleLeft}
                />
                <span>Show all collection items</span>
            </Link>
        </div>
        <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
    </section>
  )
}

export default NewMenuItemPage