'use client';
import {signIn} from "next-auth/react";
import Image from "next/image";
import {useState} from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  
    
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: ev.target.email.value,
        password: ev.target.password.value,
      });
      
      if (!result) {
        console.error("No response from signIn");
      } else if (!result.ok) {
        console.error("Login failed:", result.error);
      } else {
        console.log("Login successful:", result);
      }
      
      console.log("Login result:", result);
    } catch (err) {
      console.error("Error during signIn:", err);
    } finally {
      setLoginInProgress(false);
    }
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" name="email" placeholder="email" value={email}
               disabled={loginInProgress}
               onChange={ev => setEmail(ev.target.value)} />
        <input type="password" name="password" placeholder="password" value={password}
               disabled={loginInProgress}
               onChange={ev => setPassword(ev.target.value)}/>
        <button disabled={loginInProgress} type="submit">Login</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}
                className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
}