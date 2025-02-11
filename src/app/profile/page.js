"use client";
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import {React, useEffect} from 'react'


const ProfilePage = () => {

    const session = useSession();
    console.log(session);
    
    const {status} = session;
    const router = useRouter();


    useEffect(() => {
        if (status === "unauthenticated") {
          router.push("/login"); 
        }
      }, [status, router]);

      if(status === 'loading'){
        return 'Loading...';
    }

      const userImage = session.data.user.image;

  return (
    <section className='mt-8'>
        <h1 className="text-center text-primary text-4xl mb-4">
          Profile
        </h1>
        <form className='max-w-xs mx-auto border'>
            <div>
                <img src={userImage} alt="avatar" width={64} height={64}/>
                {/* <Image src={userImage} width={64} height={64} alt={'avatar'}/> */}
            </div>
        </form>
    </section>
  )
}

export default ProfilePage