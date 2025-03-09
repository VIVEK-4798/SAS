import React from 'react';
import SectionHeaders from '../layout/sectionHeaders';

const ContactUs = () => {
  return (
    <section className='text-center my-8' id='contact'>
      <SectionHeaders
          subHeader={'Get in Touch'}
          mainHeader={'Contact Us'}
        />
        <div className='mt-8 flex flex-col items-center gap-4 text-gray-500'>
          <p>Have a question or special request? We&apos;re here to help!</p>
          <a className='text-4xl text-gray-700 underline' href='tel:+91-9709009230'>
            +91-9709009230
          </a>
          <a className='text-lg text-gray-500 underline' href='mailto:info@pizzeria.com'>
            info@pizzeria.com
          </a>
          <p className="max-w-md">
            Whether it&apos;s a catering inquiry, feedback, or assistance with your order, feel free to reach out.
            We&apos;d love to hear from you!
          </p>
        </div>
      </section>
  )
}

export default ContactUs;
