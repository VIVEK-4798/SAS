import React from 'react';
import Image from 'next/image';

const FullScreenBanner = () => {
  return (
    <section className="w-screen h-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <Image
        src="/images/hero-banner-2.jpg" 
        alt="Full Screen Banner"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />
    </section>
  );
};

export default FullScreenBanner;
