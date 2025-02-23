'use client';
import UserTabs from '@/components/layout/UserTabs';
import { useState, useEffect } from 'react';
import { useProfile } from '@/components/UseProfile';
import UserForm from '@/components/layout/UserForm';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const EditUserPage = () => {
  const { loading, data } = useProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loadings, setLoadings] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch user data
  useEffect(() => {
    if (id) {
      setLoadings(true);
      fetch(`/api/users/${id}`)
        .then(res => res.json())
        .then(userData => {
          setUser({
            ...userData,
            userInfo: userData.userInfo || {
              city: '',
              country: '',
              phone: '',
              streetAddress: '',
              zipCode:'',
            }, 
          });
          setLoadings(false);
        })
        .catch(error => {
          console.error("Error fetching user:", error);
          setLoadings(false);
          toast.error("Failed to fetch user data.");
        });
    }
  }, [id]);

  async function handleSaveButtonClick(ev, updatedData) {
    ev.preventDefault();
    setSaving(true);


    await toast.promise(
      fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updatedData.name || "",
          image: updatedData.image || "",
          admin: updatedData.admin, 
          userInfo: updatedData.userInfo || { 
            city: "",
            country: "",
            phone: "",
            streetAddress: "",
            zipCode: "",
          },
        }),
      }).then(async (res) => {
        if (!res.ok) throw new Error("Error updating user");
        const updatedUser = await res.json();
    
    
        setUser((prev) => ({
          ...prev,
          name: updatedUser.user.name,
          image: updatedUser.user.image,
          admin: updatedUser.user.admin,
          userInfo: updatedUser.userInfo || prev.userInfo,
        }));
      }),
      {
        loading: "Updating user...",
        success: "User updated successfully!",
        error: "Error updating user.",
      }
    );
    
    setSaving(false);
}



  if (loading) return 'Loading user profile...';
  if (!data) return 'Not an admin';

  return (
    <section className='mt-8 mx-auto max-w-2xl'>
      <UserTabs isAdmin={true} />
      <div className='mt-8'>
        <UserForm user={user} onSave={handleSaveButtonClick} saving={saving} />
      </div>
    </section>
  );
};

export default EditUserPage;
