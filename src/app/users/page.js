'use client';
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/UseProfile';
import Link from 'next/link';
import {React, useEffect, useState} from 'react';
import Loader from '../../components/loader';

const UserPage = () => {

    const {loading, data} = useProfile();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('api/users').then(response => {
            response.json().then(users => {                
                setUsers(users);
            })
        })
    },[])
    if(loading){
        return <Loader/>;
      }
    
      if(!data){
        return 'Not an admin';
      }

  return (
    <section className='max-w-3xl mx-auto mt-8'>
        <UserTabs isAdmin={true}/>
        <div className='mt-8'>
            {users.length > 0 && users.map((user, index) => (
                <div key={index} 
                     className='flex items-center bg-secondry border border-borclr rounded-lg
                                 mb-2 p-1 px-4 gap-4'>
                    <div className='md:grid md:grid-cols-2  gap-4 grow'>
                        <div className='text-gray-900'>
                           {!!user.name && (<span>{user.name}</span>)}
                           {!user.name && (<span className='italic'>No name</span>)}
                            </div>
                    <span className='text-gray-500'>{user.email}</span>
                    </div>
                    <div>
                        <Link 
                            className='button'
                            style={{border: '1px solid #F9BC75'}}
                            href={'/users/'+user._id}>
                            Edit
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default UserPage