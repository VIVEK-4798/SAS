import React from 'react'

const menuItems = () => {
  return (
        <div className='bg-gray-200 p-4 rounded-lg
         text-center hover:bg-white'>
            <img src="/pizza.png" alt="pizza"/>
            <h4 className='font-semibold my-3 text-xl' 
            >Pepperoni Pizza</h4>
            <p className='text-gray-500 text-sm'>
            A classic delight topped with spicy pepperoni,
             melted cheese, and a crispy crust.
            </p>
            <button className='mt-4 bg-primary text-white
             rounded-full px-8 py-2'>
                Add to cart $12
            </button>
        </div>
  )
}

export default menuItems