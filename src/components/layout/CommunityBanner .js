import React from 'react';

const CommunityBanner = () => {
  return (
    <section
      className="relative bg-cover bg-center py-16 px-4 rounded-md"
      style={{ backgroundImage: "url('/banner2.jpg')" }}
    >
      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative max-w-4xl mx-auto text-center space-y-6 text-white z-10">
        <p className="text-lg md:text-xl font-light italic">
          IT&apos;S NICE TO BE ON THE INSIDE.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">
          JOIN OUR COMMUNITY & STAY IN TOUCH
        </h2>

        <a
          href="https://www.instagram.com/sas_youaremadetobethebest?utm_source=ig_web_button_share_sheet&igsh=Mzl0ZjB2NXRzeGgy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 bg-primary text-white w-fit px-6 py-2 border border-white rounded-lg
           uppercase font-medium tracking-wider hover:brightness-110 transition duration-300 mx-auto"
        >
          CHECK US OUT
        </a>
      </div>
    </section>
  );
};

export default CommunityBanner;
