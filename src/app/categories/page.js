"use client";
import UserTabs from '@/components/layout/UserTabs';
import React from 'react';

const CategoriesPage = () => {

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      fetch('/api/profile').then(response => {
        response.json().then(data => {
            setIsAdmin(data.admin);
        })
      })
    }, [])
    
    if(!isAdmin){
        return 'Not an admin';
    }

  return (
    <section className='mt-8 max-w-lg mx-auto'>
        <UserTabs isAdmin={true}/>
        Categories
    </section>
  );
};

export default CategoriesPage