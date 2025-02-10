'use client';
import Credentials from "next-auth/providers/credentials";
import {signIn, getSession} from "next-auth/react";
import Image from "next/image";
import {useState} from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  
  
async function handleFormSubmit(ev) {
  ev.preventDefault();
  setLoginInProgress(true);

  const email = ev.target.email.value;
  const password = ev.target.password.value;

  // console.log("📧 Email entered:", email);
  // console.log("🔑 Password entered:", password ? "Present" : "Missing");

  try {
    const result = await signIn("credentials", {
      redirect: false,
      email: ev.target.email.value,  
      password: ev.target.password.value,
    })
    console.log(Credentials);
    
    console.log("🚀 Sign-in Response:", result);

    if (!result || result.error) {
      console.error("❌ Login failed:", result?.error);
      return;
    }

    console.log("✅ Login successful, refreshing session...");

    // Check if session is updated
    const session = await getSession();
    console.log("📦 Updated Session:", session);

  } catch (err) {
    console.error("🔥 Error during signIn:", err);
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