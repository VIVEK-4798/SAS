"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import UserForm from "../../components/layout/UserForm";
import toast from "react-hot-toast";
import Loader from '../../components/loader';

const ProfilePage = () => {
  const session = useSession();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  const { status } = session;

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    // ✅ Ensure image is a string (not an array)
    const safeImage = Array.isArray(data.image) ? data.image[0] : data.image;

    const payload = {
      ...data,
      image: safeImage,
    };

    const updatePromise = fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
    return <Loader />;
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-3xl mx-auto mt-8">
        <UserForm user={user} session={session} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
};

export default ProfilePage;
