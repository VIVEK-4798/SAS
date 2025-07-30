'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import FullScreenBanner from '../components/layout/FullScreenBanner';
import Hero from '../components/layout/hero';
import HomeMenu from '../components/layout/homeMenu';
import CollectionShowcase from '../components/layout/CollectionShowcase';
import CollectionGrid from '../components/layout/CollectionGrid';
import CommunityBanner from '../components/layout/CommunityBanner ';
import AboutUs from '../components/layout/AboutUs';
import ContactUs from '../components/layout/ContactUs';
import FAQ from '../components/layout/FAQ';
import Subscribe from '../components/layout/Subscribe';
import BenefitsBar from '../components/layout/BenefitsBar';

export default function Home() {
  const { status } = useSession(); // check login status
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 7000); 

      return () => clearTimeout(timer); 
    }
  }, [status]);

  return (
    <>
      <FullScreenBanner />

      <div>
        <Hero />
        <HomeMenu />
        <BenefitsBar />
        <CollectionShowcase />
        <CollectionGrid />
        <CommunityBanner />
        <ContactUs />
        <Subscribe />
        <AboutUs />
        <FAQ />
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center space-y-4">
            <h2 className="text-xl font-semibold text-primary">Welcome to SAS!</h2>
            <p className="text-gray-700">
              Sign in for personalized styles, early sales access, and a faster checkout experience!
            </p>
           <div className="flex justify-center gap-4">
              <a
                href="/login"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 w-32 text-center"
              >
                Login
              </a>
              <button
                onClick={() => setShowPopup(false)}
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 w-32"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
