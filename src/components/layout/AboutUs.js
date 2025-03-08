import React from 'react';
import SectionHeaders from '../layout/sectionHeaders';

const AboutUs = () => {
  return (
    <section className='text-center my-16' id='about'>
        <SectionHeaders
          subHeader={'Our Story'}
          mainHeader={'About Us'}
        />
        <div className='text-gray-500 max-w-6xl mx-auto
        mt-4 flex flex-col gap-4'>
        <p>
            Welcome to pizzeria, where passion for authentic flavors meets convenience. 
            Our journey began with a simple mission: to bring the finest, handcrafted pizzas 
            straight to your doorstep. Using only the freshest ingredients, traditional recipes, 
            and a touch of innovation, we create mouthwatering pizzas that satisfy every craving.
        </p>
        <p>
            At pizzeria, we believe that great food should be accessible to everyone. 
            Whether you prefer a classic Margherita or an adventurous gourmet topping, our menu 
            offers something for every pizza lover. We are committed to quality, ensuring that 
            each bite delivers an unforgettable experience.
        </p>
        <p>
            Join us on this delicious journey and let us serve you the best pizzas, made with 
            love and delivered with care. Your perfect slice is just a click away!
        </p>
        </div>
      </section>
  )
}

export default AboutUs;
