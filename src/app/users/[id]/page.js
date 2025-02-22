'use client';
import UserTabs from '@/components/layout/UserTabs';
import { useState, useEffect } from 'react';
import { useProfile } from '@/components/UseProfile';
import UserForm from '@/components/layout/UserForm';
import { useParams } from 'next/navigation';

const EditUserPage = () => {
  const { loading, data } = useProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/profile`)  // Fetch from profile API instead
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser({
            ...data.user, 
            userInfo: data.userInfo || {}, // ✅ Ensure userInfo exists
          });
        }
        console.log("Fetched user info:", data);
      })
      .catch(error => console.error("Error fetching user:", error));
}, [id]);

  async function handleSaveButtonClick(ev, data){
    ev.preventDefault();
    fetch
  }

  if (loading) return 'Loading user profile...';
  if (!data) return 'Not an admin';

  return (
    <section className='mt-8 mx-auto max-w-2xl'>
      <UserTabs isAdmin={true} />
      <div className='mt-8'>
         <UserForm user={user} onSave={handleSaveButtonClick}/>
      </div>
    </section>
  );
};

export default EditUserPage;
