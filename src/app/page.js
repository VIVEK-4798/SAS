import Hero from '../components/layout/hero';
import HomeMenu from '../components/layout/homeMenu';
import AboutUs from '../components/layout/AboutUs';
import ContactUs from '../components/layout/ContactUs';
import '../app/globals.css'

export default function Home() {
  return (
    <>
      <Hero/>
      <HomeMenu/>
      <AboutUs/>
      <ContactUs/>
    </>
  );
}
