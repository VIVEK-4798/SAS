import React from 'react';
import SectionHeaders from '../layout/sectionHeaders';

const AboutUs = () => {
  return (
    <section className='text-center my-16' id='about'>
      <SectionHeaders
        subHeader={'Our Vision and Values'}
        mainHeader={'About Us'}
      />
      <div className='text-gray-600 max-w-6xl mx-auto mt-4 flex flex-col gap-5 text-base leading-relaxed'>
        <p>
          Welcome to <strong>SAS</strong> where timeless style meets everyday comfort.
          Born out of a passion for premium fashion and everyday wearability, we are more than just an e-commerce platform.
          We are a community driven by individuality, confidence, and sustainability.
        </p>
        <p>
          Every collection at SAS is carefully curated with a focus on quality, craftsmanship, and detail.
          From everyday basics to statement pieces, our clothing is designed to empower you to look and feel your best no matter the occasion.
        </p>
        <p>
          At the heart of SAS is a belief in authenticity and trust.
          We work only with ethical suppliers and trusted manufacturers to ensure that our materials are responsibly sourced and our products stand the test of time.
        </p>
        <p>
          Whether you&apos;re building your capsule wardrobe or discovering your signature style,
          SAS is here to elevate your fashion journey one piece at a time.
        </p>
        <p>
          Thank you for choosing SAS. We&apos;re honored to be part of your story.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
