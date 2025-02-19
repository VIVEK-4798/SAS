'use client';
import { useProfile } from '@/components/UseProfile'
import {React, useState} from 'react';
import UserTabs from '@/components/layout/UserTabs';
import Link from 'next/link';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { redirect } from 'next/navigation';
import toast from "react-hot-toast";
import MenuItemForm from '@/components/layout/MenuItemForm';

const NewMenuItemPage = () => {

    const {loading, data} = useProfile();
    const [redirectToItems, setRedirectToItems] = useState(false);

    async function handleFormSubmit(ev, data) { 
        ev.preventDefault();
        const savingPromise =new Promise(async(resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'content-type': 'application/json'},
            });
            if(response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item...',
            success: 'Saved',
            error: 'Error saving item'
        });

        setRedirectToItems(true);
    }
    if(redirectToItems){
        return redirect('/menu-items');
    }

    if(loading){
        return 'Loading user info...';
    }
    if(!data){
        return 'Not an admin';
    }

  return (
    <section className='mt-8'>
        <UserTabs isAdmin={true}/>
        <div className='max-w-md mx-auto mt-8'>
            <Link
                href={'/menu-items'}
                className='button'>
                <FontAwesomeIcon
                    icon={faArrowCircleLeft}
                />
                <span>Show all menu items</span>
            </Link>
        </div>
        <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
    </section>
  )
}

export default NewMenuItemPage