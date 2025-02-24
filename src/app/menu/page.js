'use client'
import React, { useEffect, useState } from 'react';
import SectionHeaders from '../../components/layout/sectionHeaders';
import MenuItems from '../../components/Menu/menuItems';

const MenuPage = () => {

    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        });
    }, []);

  return (
    <section className='mt-8'>
        {categories?.length > 0 && categories.map((c,i) => (
            <div key={i}>
                <div className="text-center">
                    <SectionHeaders mainHeader={c.name}/>
                </div>
                <div className='grid grid-cols-3 gap-4 mt-6 mb-12'>
                {menuItems.filter(item => item.category === c._id).map((item, i) => (
                    <div key={i}>
                        <MenuItems {...item}/>
                    </div>
                ))} 
                </div>
            </div>
        ))}
    </section>
  )
}

export default MenuPage