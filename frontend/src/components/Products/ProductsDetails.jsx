import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish jacket perfect for any occasion",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/500/500/?random=11",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/500/500/?random=12",
      altText: "Stylish Jacket 2",
    },
  ],
};

const similarPoduct = [
  {
    _id: 1,
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=21",
        altText: "Stylish Jacket 1",
      },
    ],
  },
  {
    _id: 2,
    name: "Stylish Jacket 2",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=22",
        altText: "Stylish Jacket 1",
      },
    ],
  },
  {
    _id: 3,
    name: "Stylish Jacket 3",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=23",
        altText: "Stylish Jacket 1",
      },
    ],
  },
  {
    _id: 4,
    name: "Stylish Jacket 4",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=24",
        altText: "Stylish Jacket 1",
      },
    ],
  },
];

const placeholderProducts = [
  {
    _id: 1,
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=21",
        altText: "Stylish Jacket 1",
      },
    ],
  },
  {
    _id: 2,
    name: "Stylish Jacket 2",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=22",
        altText: "Stylish Jacket 1",
      },
    ],
  },
  {
    _id: 3,
    name: "Stylish Jacket 3",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=23",
        altText: "Stylish Jacket 1",
      },
    ],
  },
  {
    _id: 4,
    name: "Stylish Jacket 4",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=24",
        altText: "Stylish Jacket 1",
      },
    ],
  },
  {
    _id: 5,
    name: "Stylish Jacket 5",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=25",
        altText: "Stylish Jacket 1",
      },
    ],
  },
  {
    _id: 6,
    name: "Stylish Jacket 6",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=26",
        altText: "Stylish Jacket 1",
      },
    ],
  },
  {
    _id: 7,
    name: "Stylish Jacket 7",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=27",
        altText: "Stylish Jacket 1",
      },
    ],
  },
  {
    _id: 8,
    name: "Stylish Jacket 8",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=28",
        altText: "Stylish Jacket 1",
      },
    ],
  },
];

const ProductsDetails = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (selectedProduct > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [mainImage]);

  const handleQuanityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);

    setTimeout(() => {
      toast.success("Product Added to cart !", {
        duration: 1000,
      });
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                onClick={() => setMainImage(image.url)}
                key={index}
                src={image.url}
                alt={image.altText}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt={selectedProduct.images[0].altText}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Mobile Thumbnails */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                onClick={() => setMainImage(image.url)}
                key={index}
                src={image.url}
                alt={image.altText}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>
          {/* Right Side */}
          <div className="md:w1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font semi-bold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice &&
                `${selectedProduct.originalPrice}`}
            </p>
            <div className="text-xl text-gray-500 mb-2">
              $ {selectedProduct.price}
            </div>
            <div className="text-gray-600 mb-4">
              {selectedProduct.description}
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color, index) => (
                  <button
                    onClick={() => setSelectedColor(color)}
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Size: </p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size, index) => (
                  <button
                    onClick={() => setSelectedSize(size)}
                    key={index}
                    className={`px-4 py-3 rounded border-2 ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuanityChange("minus")}
                  className="border bg-gray-200 px-2 py-1 rounded text-lg"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuanityChange("plus")}
                  className="border bg-gray-200 px-2 py-1 rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <button
              disabled={isButtonDisabled}
              onClick={handleAddToCart}
              className={`bg-black text-white px-6 py-2 rounded-lg w-full mb-4  ${
                isButtonDisabled
                  ? "cursor-not-allowed bg-gray-600"
                  : "hover:bg-gray-900"
              }`}
            >
              {!isButtonDisabled ? `Add to Cart` : "Adding..."}
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristice:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tr>
                  <th className="py-1">Brand</th>
                  <td className="py-1">{selectedProduct.brand}</td>
                </tr>
                <tr>
                  <th className="py-1">Material</th>
                  <td className="py-1">{selectedProduct.material}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid products={similarPoduct} />
        </div>
      </div>
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
    </div>
  );
};

export default ProductsDetails;
