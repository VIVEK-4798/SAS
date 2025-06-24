import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { cartProductPrice } from "../sessionWrapper";

const CartProduct = ({ product, index, onRemove }) => {
  const firstImage = product.image?.[0] || "/pizzeria-logo.jpg";
  const discounted = product.extraIngredientsPrices?.[0];
  const originalPrice = product.basePrice;
  const discountAmount = discounted?.price || 0;
  const finalPrice = cartProductPrice(product);

  return (
    <div className="flex flex-col border-b py-4">
      {/* Product Row */}
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="w-24 h-24 relative flex-shrink-0">
          <Image
            src={firstImage}
            alt={product.name || "Product image"}
            fill
            className="rounded-md object-contain bg-[#fdf3e7]"
          />
        </div>

        {/* Product Details */}
        <div className="grow">
          <h3 className="font-semibold text-lg">{product.name}</h3>

          {product.size && (
            <div className="text-sm">
              Size: <span>{product.size.name}</span>
            </div>
          )}

          {product.extras?.length > 0 && (
            <div className="text-sm text-gray-500 mt-1">
              {product.extras.map((extra, i) => (
                <div key={i}>
                  {extra.name} ₹{extra.price}
                </div>
              ))}
            </div>
          )}

          {discounted && (
            <div className="text-sm text-green-600 font-medium mt-1">
              Discount: {discounted.name} (-₹{discountAmount})
            </div>
          )}
        </div>

        {/* Price and Remove Button */}
        <div className="text-right flex flex-col items-end justify-between h-full gap-2">
          <div className="text-lg font-bold text-primary">
            {discounted ? (
              <>
                <span className="line-through text-gray-400 text-sm mr-1">₹{originalPrice}</span>
                ₹{finalPrice}
              </>
            ) : (
              <>₹{finalPrice}</>
            )}
          </div>

          {!!onRemove && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-gray-500 hover:text-red-500 transition-colors"
              title="Remove"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
