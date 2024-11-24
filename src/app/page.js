import Header from '../components/layout/header';
import Hero from '../components/layout/hero';
import HomeMenu from '../components/layout/homeMenu';
import SectionHeaders from '../components/layout/sectionHeaders';
import '../app/globals.css'

export default function Home() {
  return (
    <>
      <Hero/>
      <HomeMenu/>
      <section className='text-center my-16'>
        <SectionHeaders
          subHeader ={'Our Story'}
          mainHeader = {'About us'}
        />
        <div className='text-gray-500 max-w-md mx-auto 
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
      <section className='text-center my-8'>
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
      
    </>
  );
}
