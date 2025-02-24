import React from 'react';
import SectionHeaders from '../layout/sectionHeaders';

const ContactUs = () => {
  return (
    <section className='text-center my-8' id='contact'>
      <SectionHeaders
          subHeader ={'Don\'t hesitate'}
          mainHeader = {'Contact us'}
        />
        <div className='mt-8'>
        <a className='text-4xl text-gray-500 underline' href='tel:+4567890-98765'>
          +4567890-98765
        </a>
        </div>
      </section>
  )
}

export default ContactUs