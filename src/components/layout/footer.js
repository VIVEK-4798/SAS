"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const Footer = () => {
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
    <div className="bg-[#fdf3e7] mt-16 md:mt-auto md:pt-36">
      {/* Help Section */}
      <section
        className="relative bg-cover bg-center text-white py-16 px-6 md:px-16"
        style={{ backgroundImage: "url('/banner3.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
          <div className="max-w-xl space-y-4">
            <p className="uppercase text-sm tracking-wider">Need help?</p>
            <h2 className="text-3xl font-semibold leading-snug">
              We are here to help
            </h2>
            <p className="text-sm text-white/80">
              Our team is here to make your shopping stress free.
            </p>
            <Link
              href="/#contact"
              className="inline-block mt-4 bg-white text-black px-6 py-2 uppercase rounded-lg font-medium tracking-wide hover:bg-gray-200 transition"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-primary text-white px-6 md:px-16 py-12 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Contact */}
          <div className="space-y-3">
            <h4 className="uppercase font-semibold text-white">Contact</h4>
            <p>Email: support@sas.com</p>
            <p>Phone: +91 9876543210</p>
            <p>Address: 123 Street, City, India</p>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="uppercase font-semibold text-white">Shop</h4>
            <Link href="/menu#menscollection" className="block hover:underline text-white/80 hover:text-white transition">
              Men
            </Link>
            <Link href="/menu#womenswear" className="block hover:underline text-white/80 hover:text-white transition">
              Women
            </Link>
            <Link href="/menu#accessories" className="block hover:underline text-white/80 hover:text-white transition">
              Accessories
            </Link>
            <Link href="/menu#sale" className="block hover:underline text-white/80 hover:text-white transition">
              Sale
            </Link>
          </div>
          
          {/* Company */}
          <div className="space-y-3">
            <h4 className="uppercase font-semibold text-white">Company</h4>
            <p>About</p>
            <p>Careers</p>
            <p>Returns & Exchanges</p>
            <p>Privacy Policy</p>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="uppercase font-semibold text-white">Newsletter</h4>
            <p>Enter your email for exclusive offers</p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-3 py-2 text-black w-full focus:outline-none"
              />
              <button
                onClick={handleSubscribe}
                className="bg-white text-black px-4 py-2 hover:bg-gray-200 transition mb-2"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white/50 border-t border-white/20 pt-6">
          <p>&copy; 2025 sas.com</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
