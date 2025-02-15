"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { React, useEffect, useState } from "react";
import Image from "next/image";
import InfoBox from '../../components/layout/InfoBox';
import SuccessBox from '../../components/layout/SuccessBox';
import UserTabs from '../../components/layout/UserTabs';
import Link from "next/link";

const ProfilePage = () => {
  const session = useSession();
  console.log("session hahah:",session);
  
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [originalUserName, setOriginalUserName] = useState('');
  const [saved, setSaved] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); 
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isEdited, setIsEdited] = useState(false); 
  const [streetAddress, setStreetAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false)

  const { status } = session;

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setSaved(false);
    setFadeOut(false);

    setIsSaving(true);
    const response = await fetch('/api/profile', {
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
    });
    setIsSaving(false);

    if (response.ok) {
      setSaved(true);
      setOriginalUserName(userName);
      setIsEdited(false);

      setTimeout(() => setFadeOut(true), 2000);
      setTimeout(() => setSaved(false), 3000);
    }
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
                setIsAdmin(data.user?.isAdmin || false);
                setProfileFetched(true);
            })
    }
}, [session, status]);


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.append('files', files[0]);
      setIsUploading(true);
      const response = await fetch('/api/upload', { method: 'POST', body: data });
      const link = await response.json();
      setImage(link.link);
      setIsUploading(false);
    }
  }

  useEffect(() => {
    setIsEdited(
      userName !== originalUserName || phone || streetAddress || zipCode || city || country
    );
  }, [userName, phone, streetAddress, zipCode, city, country]);

  if (status === "loading" || !profileFetched){
      return "Loading...";
    }
    

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin}/>

      <div className="max-w-md mx-auto mt-8">
        {saved && <SuccessBox fadeOut={fadeOut}/>}
        {isSaving && <InfoBox>Saving...</InfoBox>}
        {isUploading && <InfoBox>Uploading...</InfoBox>}
        <div className="flex gap-4">
          <div>
            <div className="p-2 rounded-lg relative max-w-[80px]">
              {image && (
                <Image className="rounded-lg w-full h-full mb-1 max-h-[80px]" src={image} alt="avatar" width={250} height={250} />
              )}
              <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block text-center border border-gray-300 rounded-lg p-2 cursor-pointer">Edit</span>
              </label>
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
