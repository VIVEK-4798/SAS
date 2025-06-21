import FullScreenBanner from '../components/layout/FullScreenBanner';
import Hero from '../components/layout/hero';
import HomeMenu from '../components/layout/homeMenu';
import CollectionShowcase from '../components/layout/CollectionShowcase';
import CollectionGrid from '../components/layout/CollectionGrid';
import CommunityBanner from '../components/layout/CommunityBanner ';
import AboutUs from '../components/layout/AboutUs';
import ContactUs from '../components/layout/ContactUs';
import FAQ from '../components/layout/FAQ';
import Subscribe from '../components/layout/Subscribe';

export default function Home() {
  return (
    <>
      <FullScreenBanner />

      <div>
        <Hero />
        <HomeMenu />
        <CollectionShowcase />
        <CollectionGrid />
        <CommunityBanner />
        <ContactUs />
        <Subscribe />
        <AboutUs/>
        <FAQ />
      </div>
    </>
  );
}
