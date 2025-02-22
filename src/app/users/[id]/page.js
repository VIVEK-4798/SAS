'use client';
import UserTabs from '@/components/layout/UserTabs'
import {React, useState, useEffect } from 'react';
import { useProfile } from '@/components/UseProfile';
import UserForm from '@/components/layout/UserForm';
import { useParams } from 'next/navigation';

const EditUserPage = () => {

  const {loading, data} = useProfile();
  const {id} = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/users').then(res => {
      res.json().then(users => {
        const user = users.find(u =>u._id === id);
        setUser(user);
        console.log("user info:",user);
        
      })
    })
  }, []);

  if(loading){
      return 'Loading user profile...';
  }
  if(!data){
      return 'Not an admin';
  }

  return (
    <section className='mt-8 mx-auto max-w-2xl'>
        <UserTabs isAdmin={true}/>
        <div className='mt-8'>
          <UserForm user={user}/>
        </div>
    </section>
  )
}

export default EditUserPage