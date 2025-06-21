import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="sm:text-center md:text-left md:grid grid-cols-custom gap-8 md:mt-20 mb-8">
      <div className="py-6 md:py-12">
        <h1 className="text-4xl font-semibold leading-tight">
          For Every Vibe, There's a&nbsp;
          <span className="text-primary">Style</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Discover fashion that fits your story. Whether it&apos;s casual, classy,
          or bold — Sas helps you dress your vibe with confidence.
        </p>
        <div className="flex items-center gap-4">
          <button className="flex items-center bg-primary text-white px-5 py-2 rounded-full text-sm">
            <Link href="/menu">SHOP NOW</Link>
            <FontAwesomeIcon
              icon={faArrowCircleRight}
              className="ml-2 w-4"
            />
          </button>
          <button className="flex items-center gap-2 py-2 text-gray-600 font-semibold text-sm">
            <Link href="/#faq">Learn more</Link>
            <FontAwesomeIcon
              icon={faArrowCircleRight}
              className="ml-2 w-4"
            />
          </button>
        </div>
      </div>

      <div className="relative hidden md:block h-[450px] rounded-lg overflow-hidden bg-[#fdf3e7]">
        <Image
          src="/images/hero.png"
          alt="sas-hero-image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg mix-blend-multiply"
        />
      </div>
    </section>
  );
};

export default Hero;
