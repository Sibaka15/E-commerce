import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const cardProducts = [
    {
      productId: 1,
      name: "T-shrit",
      size: "M",
      color: "Red",
      quanntity: 1,
      price: 99,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Jeans",
      size: "L",
      color: "Blue",
      quanntity: 1,
      price: 19,
      image: "https://picsum.photos/200?random=2",
    },
  ];
  return (
    <div>
      {cardProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover rounded mr-4"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <div className="border rounded px-2 py-1 text-xl font-medium">
                  -
                </div>
                <span className="mx-3">{product.quanntity}</span>
                <div className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </div>
              </div>
            </div>
          </div>
          <div>
            <p> ${product.price} </p>
            <button>
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600"/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
