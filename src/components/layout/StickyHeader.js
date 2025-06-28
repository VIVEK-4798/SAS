// components/layout/StickyHeader.jsx
"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../sessionWrapper";
import Image from "next/image";

const StickyHeader = () => {
  const [visible, setVisible] = useState(false);
  const { cartProducts } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[999] bg-secondry shadow-md transition-transform duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <Image src="/sas-logo.jpg" width={35} height={35} alt="SAS" className="rounded-full" />
          SAS
        </Link>
        <nav className="flex gap-6 text-sm text-gray-700 font-semibold">
          <Link href="/menu">Collection</Link>
          <Link href="/#faq">FAQs</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <Link href="/cart" className="relative text-xl">
          <FontAwesomeIcon icon={faCartShopping} />
          {cartProducts?.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-primary text-white rounded-full text-xs px-2 py-1">
              {cartProducts.length}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default StickyHeader;
