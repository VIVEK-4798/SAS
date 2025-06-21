import Image from 'next/image';
import Link from 'next/link';
import SectionHeaders from '../layout/sectionHeaders';

export default function CollectionGrid() {
  const collections = [
    {
      title: "Men’s Collection",
      src: "/images/oversizes1-tshirt.jpg",
      targetId: "menscollection",
    },
    {
      title: "Women’s Collection",
      src: "/images/female-collection.avif",
      targetId: "womenswear",
    },
    {
      title: "Accessories Collection",
      src: "/images/accessories-collection.webp",
      targetId: "accessories",
    },
  ];

  return (
    <section className="px-6 md:px-12 py-16 bg-[#fdf3e7] text-center">
      {/* Heading */}
      <div className="mb-12">
        <SectionHeaders mainHeader={'COLLECTION'} subHeader={'Our Special'} />
      </div>

      {/* Collection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {collections.map((item, index) => (
          <Link key={index} href={`/menu#${item.targetId}`} className="block group">
            <div className="relative h-[450px] rounded-md overflow-hidden cursor-pointer">
              <Image
                src={item.src}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">{item.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quote Section */}
      <div className="mt-16 max-w-4xl mx-auto text-center space-y-12">
        <blockquote className="relative text-gray-700 text-2xl font-semibold leading-relaxed px-8">
          <span className="text-6xl  text-gray-300 absolute -left-0 -top-6 select-none">“</span>
          <p className="z-10 relative md:text-2xl text-[17px]">
            The designs are timeless and the quality is unmatched. Every piece feels made just for me.
          </p>
          <footer className="mt-4 text-base text-gray-600 font-medium">— Alina R.</footer>
        </blockquote>
      </div>
    </section>
  );
}
