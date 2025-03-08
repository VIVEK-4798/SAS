'use client';
import { useProfile } from '@/components/UseProfile'
import {React, useEffect, useState} from 'react';
import UserTabs from '@/components/layout/UserTabs';
import Link from 'next/link';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { redirect, useParams } from 'next/navigation';
import toast from "react-hot-toast";
import MenuItemForm from '../../../../components/layout/MenuItemForm';
import DeleteButton from '../../../../components/DeleteButton';
import Loader from '@/components/loader';

const EditMenuItemPage = () => {

    const {id} = useParams();
    const {loading, data} = useProfile();
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);

    useEffect(()=> {
      fetch('/api/menu-items').then(res => {
        res.json().then(items => {
          const item = items.find(i=> i._id === id);
            setMenuItem(item);            
        })
      })
    }, [id])

    async function handleFormSubmit(ev, data) { 
        ev.preventDefault(); 
         data = {...data, _id:id};

        const savingPromise =new Promise(async(resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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

    async function handleDeleteClick(){
        const promise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/menu-items?_id='+id, {
                method: 'DELETE',
            });
            if(response.ok)
                resolve();
              else
                reject();
        });
        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error',
          });
          setRedirectToItems(true);
    }

    if(redirectToItems){
        return redirect('/menu-items');
    }

    if(loading){
        return <Loader/>
    }
    if(!data){
        return 'Not an admin';
    }

  return (
    <section className='mt-8'>
        <UserTabs isAdmin={true}/>
        <div className='max-w-2xl mx-auto mt-8'>
            <Link
                href={'/menu-items'}
                className='button'>
                <FontAwesomeIcon
                    icon={faArrowCircleLeft}
                />
                <span>Show all menu items</span>
            </Link>
        </div>
        <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
        <div className='flex justify-center max-w-md mx-auto mt-3'>
            <div className='max-w-xs md:ml-auto pl-4'>
                <DeleteButton 
                    label ="Delete this menu item"
                    onDelete={handleDeleteClick}
                />
            </div>
        </div>
    </section>
  )
}

export default EditMenuItemPage