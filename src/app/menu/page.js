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

    Promise.all([fetchCategories, fetchMenuItems]).then(([categories, menuItems]) => {
      setCategories(categories);
      setMenuItems(menuItems);
      setLoading(false);
    });
  }, []);

  // 🔁 Scroll to anchor *after* loading is complete
  useEffect(() => {
    if (!loading) {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1); // remove '#'
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [loading]); // run when loading becomes false

  return (
    <section className='mt-8'>
      {loading ? (
        <Loader />
      ) : (
        categories?.length > 0 && categories.map((c, i) => (
          <div key={i} id={generateId(c.name)}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className='grid sm:grid-cols-3 gap-4 mt-6 mb-12'>
              {menuItems
                .filter(item => item.category === c._id)
                .map((item, i) => (
                  <div key={i}>
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
