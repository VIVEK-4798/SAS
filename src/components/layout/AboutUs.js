import React from 'react';
import SectionHeaders from '../layout/sectionHeaders';

const AboutUs = () => {
  return (
    <section className='text-center my-16' id='about'>
        <SectionHeaders
          subHeader ={'Our Story'}
          mainHeader = {'About us'}
        />
        <div className='text-gray-500 max-w-7xl mx-auto 
        mt-4 flex flex-col gap-4'>
        <p>
            Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Nulla nemo veritatis minus
            error eius iste laboriosam quaerat! Quaerat
            eligendi voluptatibus, veniam rem libero
            exercitationem molestias numquam, culpa 
            in eaque voluptas.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Nulla nemo veritatis minus
          error eius iste laboriosam quaerat! Quaerat
          eligendi voluptatibus, veniam rem libero
          exercitationem molestias numquam, culpa 
          in eaque voluptas.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Nulla nemo veritatis minus
          error eius iste laboriosam quaerat!
        </p>
        </div>
      </section>
  )
}

export default AboutUs