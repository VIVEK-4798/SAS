import React from 'react';

const AddToCartButton = ({onClick, basePrice, image}) => {

  return (
    <button
        onClick={onClick}
        className="mt-4 bg-primary text-white rounded-full px-8 py-2">
          <span>Add to cart (from ₹{basePrice})</span>
      </button>
  )
}

export default AddToCartButton