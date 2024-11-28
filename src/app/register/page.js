"use client"
import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RegisterPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev){
    ev.preventDefault();
    setCreatingUser(true);
      const response = await fetch('api/register', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'content-Type': 'application/json'},
      });
      if(!response.ok){
        setError(true);
      }
      if(response.ok){
        setUserCreated(true);

      }
      setCreatingUser(false);
  }

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>
        Register
      </h1>
      {userCreated && (
        <div className='my-4 text-center'>
          User created.
          <br/>
           Now you can {' '}
          <Link href={'/login'} className='underline'>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div>
          An error has occured.<br/>
          Please try again later
        </div>
      )}
      <form className='block max-w-xs mx-auto' onSubmit={handleFormSubmit}>
        <input type='email' placeholder='Email' value={email} 
          disabled={creatingUser}
          onChange={ev => setEmail(ev.target.value)}/>
        <input type='password' placeholder='password' value={password}
            disabled={creatingUser}
            onChange={ev => setPassword(ev.target.value)}/>
        <button type='submit' disabled={creatingUser}>
          Register
          </button>
        <div className='my-4 text-center text-gray-500'>
          or login with provider
        </div>
        <button className='flex gap-4 justify-center'>
          <Image src={'/google.png'} alt={'google icon'} width={24} height={24}/>
          Login with google
          </button>
      </form>
    </section>
  )
}

export default RegisterPage