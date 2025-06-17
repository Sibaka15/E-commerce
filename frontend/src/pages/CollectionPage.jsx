import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState("");
//   const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 const wrapperRef = useRef(null);

  const toogleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

const handleOutsideClick = (e) => {
  const isLargeScreen = window.innerWidth >= 1024;
  if (isLargeScreen) return;

  if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
    setIsSidebarOpen(false);
  }
};

useEffect(() => {
  document.addEventListener("mousedown", handleOutsideClick);
  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, []);


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

  useEffect(() => {
    setProducts(placeholderProducts);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
  <div ref={wrapperRef}>
    <button
      onClick={toogleSidebar}
      className="lg:hidden flex items-center justify-center border p-2 w-full"
    >
      <FaFilter className="mr-2" /> Filter
    </button>

    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed w-64 inset-y-0 bg-white z-50 left-0 overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
    >
      <FilterSidebar />
    </div>
  </div>

  <div className="flex-grow p-4">
    <h2 className="text-2xl uppercase">All Collection</h2>
    <SortOptions />
    <ProductGrid products={placeholderProducts} />
  </div>
</div>

  );
};

export default CollectionPage;
