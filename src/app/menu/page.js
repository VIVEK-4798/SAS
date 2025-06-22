'use client'
import React, { useEffect, useState } from 'react';
import SectionHeaders from '../../components/layout/sectionHeaders';
import MenuItems from '../../components/Menu/menuItems';
import Loader from '../../components/loader';

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateId = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/['’]/g, '')
      .replace(/[^\w-]/g, '');
  };

  // Fetch categories and menu items
  useEffect(() => {
    setLoading(true);
    const fetchCategories = fetch('/api/categories').then(res => res.json());
    const fetchMenuItems = fetch('/api/menu-items').then(res => res.json());

    Promise.all([fetchCategories, fetchMenuItems])
      .then(([categories, menuItems]) => {
        setCategories(categories);
        setMenuItems(menuItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

// Scroll to anchor after categories render
useEffect(() => {
  if (!loading) {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1); // remove '#'
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          setTimeout(scrollToHash, 100);
        }
      }
    };

    scrollToHash();
  }
}, [loading, categories]);

  return (
    <section className='mt-8'>
      {loading ? (
        <Loader />
      ) : (
        categories?.length > 0 &&
        categories.map((c, i) => (
          <div key={i} id={generateId(c.name)}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
              <div className='grid sm:grid-cols-3 gap-4 mt-6 mb-12'>
                {menuItems
                  .filter(item => item.category === c._id)
                  .filter(item => Array.isArray(item.image) && item.image.length > 0)
                  .map((item, j) => (
                    <div key={j}>
                      <MenuItems {...item} />
                    </div>
                  ))}
              </div>
          </div>
        ))
      )}
    </section>
  );
};

export default MenuPage;
