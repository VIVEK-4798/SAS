import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { cartProductPrice } from "../sessionWrapper";

const CartProduct = ({product, index, onRemove}) => {
  console.log(product);
    const firstImage = product.image?.[0] || "/pizzeria-logo.jpg";

  
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24 h-24 relative flex-shrink-0">
        <Image
          src={firstImage}
          alt={product.name || "Product image"}
          fill
          className="rounded-md object-contain bg-white"
        />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra, i) => (
              <div key={i}>
                {extra.name} ₹{extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">₹{cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-2"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
        )}
    </div>
  );
};

export default CartProduct;
