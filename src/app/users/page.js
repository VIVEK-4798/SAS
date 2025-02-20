'use client';
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/UseProfile';
import {React, useEffect, useState} from 'react';

const UserPage = () => {

    const {loading, data} = useProfile();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('api/users').then(response => {
            response.json().then(users => {
                console.log("users:",users);
                
                setUsers(users);
            })
        })
    },[])

    if(loading){
        return 'Loading user info...';
      }
    
      if(!data){
        return 'Not an admin';
      }

  return (
    <section className='max-w-2xl mx-auto mt-8'>
        <UserTabs isAdmin={true}/>
        <div>
            {users.length > 0 && users.map((user, index) => {
                <div key={index} className='flex bg-gray-300 rounded-lg mb-2 p-4'>
                    <div>
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    </div>
                    <div>
                        <button>Edit</button>
                    </div>
                </div>
            })}
        </div>
    </section>
  )
}

export default UserPage