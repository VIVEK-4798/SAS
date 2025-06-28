"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../sessionWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

function AuthLinks({ status, userName }) {
  // console.log("userName", userName);

  if (status === "authenticated") {
    return (
      <>
        <Link href="/profile" className="whitespace-nowrap font-medium hover:text-cocoa">
          Hello, {userName}
        </Link>
        <button onClick={() => signOut()} className="bg-primary rounded-full text-white px-8 py-2">
          Logout
        </button>
      </>
    );
  }
  
  if (status === "unauthenticated") {
    return (
      <>
        <Link href="/login">Login</Link>
        <Link href="/register" className="bg-primary rounded-full text-white px-8 py-2">
          Register
        </Link>
      </>
    );
  }
}

const Header = ({ overlay = false }) => {
  const { data: session, status } = useSession();
  const userData = session?.user;
  let userName = userData?.name;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [showDesktopDropdown, setShowDesktopDropdown] = useState(false);
  let hideDropdownTimeout;
console.log(userData);

  if (userName?.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const generateId = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/['’]/g, '')
    .replace(/[^\w-]/g, '');
};


  return (
    <header className={`${overlay ? "absolute top-0 left-0 w-full z-50" : "relative w-full"}`}>
      <div className="max-w-7xl mx-auto p-4">
        {/* Mobile Navbar */}
        <div className="flex items-center md:hidden justify-between">
          <Link className="text-primary font-bold text-2xl flex items-center" href="/">
            <Image src="/sas-logo.jpg" width={50} height={50} alt="sas-logo" className="rounded-full" />
            SAS
          </Link>
          <div className="flex gap-5 items-center">
            <Link className="relative text-xl" href="/cart">
              <FontAwesomeIcon icon={faCartShopping} className="text-gray-900" />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary text-white rounded-full text-xs py-1 px-2 leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <button className="p-1 rounded-md" onClick={() => setMobileNavOpen((prev) => !prev)}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileNavOpen && (
          <div
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden p-4 bg-gray-100 rounded-lg mt-4 flex flex-col gap-2 text-center"
          >
            <Link href="/">Home</Link>

            {/* Collection link with category toggle */}
            <div>
              <button
                className="w-full font-semibold flex items-center justify-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMobileCategories((prev) => !prev);
                }}
              >
                <Link href="/menu">Collection</Link>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
              {showMobileCategories && (
                <div className="flex flex-col mt-1 gap-1 text-sm">
                  {categories.map((cat) => (
                    <Link key={cat._id} href={`/menu#${generateId(cat.name)}`}>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/#faq">Faqs</Link>
            <Link href="/#contact">Contact</Link>
            <AuthLinks status={status} userName={userName} />
          </div>
        )}

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between">
          <Link className="text-primary font-bold text-2xl gap-2 flex items-center" href="/">
            <Image src="/sas-logo.jpg" width={50} height={50} alt="sas-logo" className="rounded-full" />
            SAS
          </Link>
          <nav className="flex items-center gap-8 text-gray-900 font-semibold relative">
            <Link href="/">Home</Link>

            {/* Collection dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(hideDropdownTimeout);
                setShowDesktopDropdown(true);
              }}
              onMouseLeave={() => {
                hideDropdownTimeout = setTimeout(() => setShowDesktopDropdown(false), 800);
              }}
            >
              <Link href="/menu" className="hover:text-cocoa hover:underline">
                Collection
              </Link>
              {showDesktopDropdown && categories.length > 0 && (
                <div
                  className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 mt-1 z-10 min-w-[150px]"
                  onMouseEnter={() => clearTimeout(hideDropdownTimeout)}
                  onMouseLeave={() => {
                    hideDropdownTimeout = setTimeout(() => setShowDesktopDropdown(false), 1500);
                  }}
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/menu#${generateId(cat.name)}`}
                      className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/#about">About</Link>
            <Link href="/#faq">FAQs</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
          <nav className="flex items-center gap-4 text-gray-900">
            <AuthLinks status={status} userName={userName} />
            <Link className="relative text-xl" href="/cart">
              <FontAwesomeIcon icon={faCartShopping} className="hover:text-cocoa" />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary text-white rounded-full text-xs py-1 px-2 leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
