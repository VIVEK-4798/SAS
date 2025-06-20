"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Subscribe = () => {
  const [email, setEmail] = useState('');

  async function handleSubscribe() {
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email.");
      return;
    }

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("You're subscribed!");
      setEmail('');
    } else {
      toast.error(data?.error || data?.message || 'Subscription failed');
    }
  }

  return (
    <section className="bg-[#fdf3e7] py-12 px-4 ">

      <div
        className="relative bg-cover bg-center py-16 px-4 rounded-md"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>

        <div className="relative max-w-2xl mx-auto text-white z-10 text-center">
          <h3 className="text-2xl font-bold uppercase mb-2">WANT DRESSING SECRETS TO LOOK CLASSY?</h3>
          <p className="mb-6">Subscribe to our newsletter</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow h-12 border border-white bg-white text-black px-4 py-2 focus:outline-none focus:border-black"
            />
            <button
              onClick={handleSubscribe}
              className="h-12 px-6 bg-primary text-white uppercase font-medium hover:bg-gray-800 transition-colors"
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
