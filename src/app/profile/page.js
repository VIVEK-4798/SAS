"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { React, useEffect, useState } from "react";
import Image from "next/image";

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState('');
  const [originalUserName, setOriginalUserName] = useState(''); 
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { status } = session;
  const router = useRouter();

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setSaved(false);
    
    if (userName !== originalUserName) {
      setIsSaving(true);
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName }),
      });
      setIsSaving(false);
      if (response.ok) {
        setSaved(true);
        setOriginalUserName(userName); 
      }
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data?.user.name);
      setOriginalUserName(session.data.user.name); 
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
      await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
    }    
  }

  if (status === "loading") {
    return "Loading...";
  }

  const userImage = session.data?.user?.image;

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto">
        {saved && (
          <h2 className="text-center bg-green-200 p-3 rounded-lg border border-green-400">
            Profile Saved!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg-blue-200 p-3 rounded-lg border border-blue-400">
            Saving...
          </h2>
        )}
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative">
              <Image className="rounded-lg w-full h-full mb-1"
                src={userImage} alt="avatar"
                width={250} height={250} />
              <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block text-center border border-gray-300
                 rounded-lg p-2 cursor-pointer">Edit</span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input type="text" placeholder="first and last name"
              value={userName} onChange={ev => setUserName(ev.target.value)} />
            <input type="email" disabled={true} value={session.data?.user.email} />
            <button type="submit" disabled={userName === originalUserName}>
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
