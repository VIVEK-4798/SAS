"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import UserForm from "../../components/layout/UserForm";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const session = useSession();
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  const { status, data } = session;

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const updatePromise = fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(response => {
      if (!response.ok) throw new Error("Profile update failed");
    });

    await toast.promise(updatePromise, {
      loading: "Saving...",
      success: "Profile updated successfully!",
      error: "Failed to update profile.",
    });
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setUser(data);
          setIsAdmin(data.userInfo?.admin || false);
          setProfileFetched(true);
        })
        .catch(error => console.error("Error fetching profile:", error));
    }
  }, [session, status]);
  

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} session={session} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
};

export default ProfilePage;
