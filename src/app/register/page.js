"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "content-Type": "application/json" },
    });

    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }

    setCreatingUser(false);
  }

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-login2.jpg"
        alt="Register background"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center min-h-screen px-4">
        <h1 className="text-primary text-4xl mb-6 font-semibold ">Register</h1>

        <form
          className="bg-secondry bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-xs"
          onSubmit={handleFormSubmit}
        >
          {userCreated && (
            <div className="my-4 text-center text-green-600 font-medium">
              User created.<br />
              Now you can{" "}
              <Link href="/login" className="underline text-blue-700">
                Login &raquo;
              </Link>
            </div>
          )}

          {error && (
            <div className="my-4 text-center text-red-600">
              An error has occurred.<br />
              Please try again later.
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled={creatingUser}
            onChange={(ev) => setEmail(ev.target.value)}
            className="mb-4 w-full px-3 py-2 border rounded-md"
            style={{ backgroundColor: "white", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            disabled={creatingUser}
            onChange={(ev) => setPassword(ev.target.value)}
            className="mb-4 w-full px-3 py-2 border rounded-md"
            style={{ backgroundColor: "white", border: "1px solid #ccc" }}
          />
          <button
            type="submit"
            disabled={creatingUser}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {creatingUser ? "Registering..." : "Register"}
          </button>

          <div className="my-4 text-center text-gray-700">
            or login with provider
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            type="button"
            className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <Image src="/google.png" alt="Google Icon" width={24} height={24} />
            Login with Google
          </button>

          <div className="text-center my-4 text-gray-600 border-t pt-4">
            Existing account?{" "}
            <Link href="/login" className="underline text-blue-700">
              Login here &raquo;
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
