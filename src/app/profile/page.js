"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from '../../components/layout/UserTabs';
import EditableImage from '../../components/layout/EditableImage';
import toast from "react-hot-toast";

const ProfilePage = () => {
  const session = useSession();
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [originalUserName, setOriginalUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  const { status } = session;

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    
    const updatePromise = fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName,
        image,
        phone,
        streetAddress,
        zipCode,
        city,
        country
      }),
    }).then(response => {
      if (!response.ok) throw new Error("Profile update failed");
      setOriginalUserName(userName);
    });

    await toast.promise(updatePromise, {
      loading: "Saving...",
      success: "Profile updated successfully!",
      error: "Failed to update profile.",
    });
  }

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data?.user.name || '');
      setOriginalUserName(session.data?.user.name || '');
      setImage(session.data.user?.image || '');
      
      fetch('/api/profile')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setPhone(data.userInfo?.phone || '');
          setStreetAddress(data.userInfo?.streetAddress || '');
          setZipCode(data.userInfo?.zipCode || '');
          setCity(data.userInfo?.city || '');
          setCountry(data.userInfo?.country || '');
          setIsAdmin(data.userInfo?.admin || false);
          setProfileFetched(true);
        })
    }
  }, [session, status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const isEdited = userName !== originalUserName || phone || streetAddress || zipCode || city || country;

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin}/>

      <div className="max-w-2xl mx-auto mt-8">
        <div className="flex gap-4">
          <div>
            <div className="p-2 rounded-lg relative max-w-[80px]">
              <EditableImage link={image} setLink={setImage} />
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label> First and last name </label>
            <input type="text" placeholder="First and Last Name"
              value={userName || ''} onChange={ev => setUserName(ev.target.value)} 
            />
            <label> Email </label>
            <input type="email" placeholder="email" disabled value={session.data?.user.email} />
            <label> Phone No. </label>
            <input type="tel" placeholder="Phone Number" value={phone || ''} onChange={ev => setPhone(ev.target.value)} />
            <label> Street address </label>
            <input type="text" placeholder="Street Address" value={streetAddress || ''} onChange={ev => setStreetAddress(ev.target.value)} />
            <div className="flex gap-2">
              <div>
                <label> Zip code </label>
                <input  type="text" placeholder="Zip Code" value={zipCode || ''} onChange={ev => setZipCode(ev.target.value)} />
              </div>
              <div>
                <label> City </label>
                <input  type="text" placeholder="City" value={city ||''} onChange={ev => setCity(ev.target.value)} />
              </div>
            </div>
            <label> Country </label>
            <input type="text" placeholder="Country" value={country ||''} onChange={ev => setCountry(ev.target.value)} />
            <button type="submit" disabled={!isEdited}>Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
