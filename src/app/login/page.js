'use client';
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    });

    setLoginInProgress(false);

    if (!result || result.error) {
      console.error('Login failed:', result?.error);
    } else {
      window.location.href = result.url || '/';
    }
  }

  return (
<section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-login2.jpg"
        alt="Login background"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-primary text-4xl mb-6 font-semibold">Login</h1>
        <form
          onSubmit={handleFormSubmit}
          className="bg-secondry bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-xs"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            disabled={loginInProgress}
            onChange={(ev) => setEmail(ev.target.value)}
            className="mb-4 w-full px-3 py-2 border rounded-md"
             style={{backgroundColor: 'white', border: '1px solid #ccc'}}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            disabled={loginInProgress}
            onChange={(ev) => setPassword(ev.target.value)}
            className="mb-4 w-full px-3 py-2 border rounded-md"
             style={{backgroundColor: 'white', border: '1px solid #ccc'}}
          />
          <button
            type="submit"
            disabled={loginInProgress}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loginInProgress ? 'Logging in...' : 'Login'}
          </button>
          <div className="my-4 text-center text-gray-600">
            or login with provider
          </div>
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <Image src="/google.png" alt="" width={24} height={24} />
            Login with Google
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
