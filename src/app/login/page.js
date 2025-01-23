"use client";
import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const loginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(ev) {
      ev.preventDefault();
      setLoginInProgress(true);
  
      const result = await signIn('credentials', {
          email,
          password,
          redirect: false, // Get the result without redirecting
      });
  
      setLoginInProgress(false);
  
      if (result.ok) {
          console.log('Login successful');
          // window.location.href = result.url;
          window.location.href = '/';
      } else {
          console.error('Login failed:', result.error);
      }
  }
  
  

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>
        Login  
      </h1>
      <form className='max-w-xs mx-auto' onSubmit={handleFormSubmit}>
      <input type='email' name='email' placeholder='Email' value={email} 
          disabled={loginInProgress}
          onChange={ev => setEmail(ev.target.value)}/>
        <input type='password'  name='password' placeholder='password' value={password}
            disabled={loginInProgress}
            onChange={ev => setPassword(ev.target.value)}/>
        <button type='submit' disabled={loginInProgress}>
          Login
        </button>
        <div className='my-4 text-center text-gray-500'>
          or login with provider
        </div>
        <button className='flex gap-4 justify-center'>
          <Image src={'/google.png'} alt={'google icon'} width={24} height={24}/>
          Login with google
        </button>
        {/* <div className='text-center my-4 text-gray-500 border-t pt-4'>
            Existing account?{' '}
            <Link href={'/login'} className='underline'>
              Login here &raquo;
            </Link>
        </div> */}
      </form>
    </section>
  )
}

export default loginPage