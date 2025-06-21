import Link from 'next/link';
import Image from 'next/image';

export default function CollectionShowcase() {
  return (
    <section className="flex flex-col md:flex-row w-full items-center justify-between gap-10 px-4 md:px-20 py-32">
      {/* Left Image */}
      <div className="w-full md:w-1/2">
        <Image
          src="/images/plane1-2-tshirt.jpg"
          alt="Gents Collection"
          width={800}
          height={1000}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Right Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
        <p className="uppercase tracking-widest text-sm text-gray-600 mb-1">
          Staying Classy
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          GENTLEMAN&apos;S KINGDOM
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto md:mx-0 text-sm md:text-base">
          An elevated wardrobe for the new season, defined by rich tactility and a sense of quiet flow.
        </p>
        <Link
          href="/menu"
          className="inline-block bg-primary hover:bg-[#1f1f14] text-white px-6 py-2 uppercase tracking-wide rounded-sm mb-4 text-sm"
        >
          Gents
        </Link>
      </div>
    </section>
  );
}
