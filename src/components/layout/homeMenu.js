"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MenuItems from "../Menu/menuItems";
import SectionHeaders from "../layout/sectionHeaders";
import Loader from "../../components/loader";

const HomeMenu = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingBestSellers, setLoadingBestSellers] = useState(true);

  useEffect(() => {
    setLoadingFeatured(true);
    fetch("/api/menu-items?featured=true")
      .then((res) => res.json())
      .then((items) => {
        setFeaturedItems(items);
        setLoadingFeatured(false);
      })
      .catch(() => setLoadingFeatured(false));
  }, []);

  useEffect(() => {
    setLoadingBestSellers(true);
    fetch("/api/menu-items?bestseller=true")
      .then((res) => res.json())
      .then((items) => {
        setBestSellers(items);
        setLoadingBestSellers(false);
      })
      .catch(() => setLoadingBestSellers(false));
  }, []);

  return (
    <section>
      <div className="absolute left-0 right-0 w-full justify-start hidden md:flex">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image
            src="/female-image.png"
            width={250}
            height={400}
            alt="model"
            className="md:w-[250px] md:h-auto object-contain"
          />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image
            src={"/cloth2.png"}
            width={250}
            height={400}
            className="md:w-[250px] md:h-auto"
            alt={"model2"}
          />
        </div>
      </div>

      {/* Best Sellers */}
      <div className="text-center mb-4">
        <SectionHeaders subHeader={"Check out"} mainHeader={"Our Best Sellers"} />
      </div>
      {loadingBestSellers ? (
        <Loader />
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          {bestSellers.length > 0 &&
            bestSellers.map((item, index) => <MenuItems {...item} key={index} />)}
        </div>
      )}

      {/* Featured Products */}
      <div className="text-center mb-4 mt-10">
        <SectionHeaders subHeader={"Spotlight"} mainHeader={"Our Featured Products"} />
      </div>
      {loadingFeatured ? (
        <Loader />
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          {featuredItems.length > 0 &&
            featuredItems.map((item, index) => <MenuItems {...item} key={index} />)}
        </div>
      )}
    </section>
  );
};

export default HomeMenu;
