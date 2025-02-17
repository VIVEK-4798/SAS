'use client';
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/UseProfile'
import React from 'react'

const MenuItemsPage = () => {

    const {loading, data} = useProfile();

    if(loading){
        return 'Loading user info...';
    }
    if(!data){
        return 'Not an admin';
    }

  return (
    <section className='mt-8'>
        <UserTabs isAdmin={true}/>
        <form className='mt-8 max-w-md mx-auto'>
            <div className="flex items-end gap-2">
                <div className='grow'>
                    <label>Menu item name</label>
                    <input type='text'/>
                </div>
                <div>
                    <button className='mb-2' type='submit'>Create</button>
                </div>
            </div>
        </form>
    </section>
  )
}

export default MenuItemsPage