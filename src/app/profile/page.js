"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { React, useEffect } from "react";
import Image from "next/image";

const ProfilePage = () => {
  const session = useSession();
  console.log("hahah:", session);

  const { status } = session;
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return "Loading...";
  }

  const userImage = session.data.user?.image;

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <form className="max-w-md mx-auto">
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg">
            <Image className="rounded-lg" src={userImage} alt="avatar" layout={'fill'}/>
            <button type="button">Change avatar</button>
            </div>
          </div>
          <div className="grow">
            <input type="text" placeholder="first and last name"/>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
