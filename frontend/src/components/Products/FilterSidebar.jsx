import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState(50);
  const [inputValue, setInputValue] = useState("50");
  const [priceRange, setPriceRange] = useState([0, 50]);

  const [filters, setFilters] = useState({
    category: "",
    colors: "",
    sizes: [],
    material: [],
    brands: [],
    gender: "",
    minPrice: 0,
    maxPrice: 100,
  });

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Green", "White", "Yellow", "Pink", "Navy", "Gray", "Black"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const material = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece"];
  const brands = ["Urban Threads", "Modren Fit", "Street Style", "Beach Breeze", "Fashionsta", "ChicStyle"];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    const minPrice = Number(params.minPrice) || 0;
    const maxPrice = Number(params.maxPrice) || 100;

    setFilters({
      category: params.category || "",
      colors: params.colors || "",
      sizes: params.sizes ? params.sizes.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brands: params.brands ? params.brands.split(",") : [],
      gender: params.gender || "",
      minPrice,
      maxPrice,
    });

    setPrice(maxPrice);
    setInputValue(String(maxPrice));
    setPriceRange([minPrice, maxPrice]);
  }, []);

  const handleSliderChange = (e) => {
    const newPrice = Number(e.target.value);
    setPrice(newPrice);
    setInputValue(String(newPrice));
    setPriceRange([0, newPrice]);

    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    const num = Number(val);

    if (!isNaN(num) && num >= 0 && num <= 100) {
      setPrice(num);
      setPriceRange([0, num]);

      const newFilters = { ...filters, minPrice: 0, maxPrice: num };
      setFilters(newFilters);
      updateURLParams(newFilters);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      const val = newFilters[key];
      if (Array.isArray(val) && val.length > 0) {
        params.set(key, val.join(","));
      } else if (val) {
        params.set(key, val);
      }
    });
    setSearchParams(params);
  };

  const renderCheckboxGroup = (label, items, name) => (
    <div className="mb-6">
      <label className="text-gray-600 font-medium block mb-2">{label}</label>
      {items.map((item, index) => (
        <div key={index} className="flex items-center mb-1">
          <input
            name={name}
            type="checkbox"
            value={item}
            checked={filters[name].includes(item)}
            onChange={handleFilterChange}
            className="h-4 w-4 mr-2 border-gray-300 text-blue-500 focus:ring-blue-400"
          />
          <span className="text-gray-700">{item}</span>
        </div>
      ))}
    </div>
  );

  const handleResetFilters = () => {
    const reset = {
      category: "",
      colors: "",
      sizes: [],
      material: [],
      brands: [],
      gender: "",
      minPrice: 0,
      maxPrice: 100,
    };
    setFilters(reset);
    setPrice(100);
    setInputValue("100");
    setPriceRange([0, 100]);
    setSearchParams({});
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-600 mb-4">Filter</h3>

      {/* Category */}
      <div className="mb-6">
        <label className="text-gray-600 font-medium block mb-2">Category</label>
        {categories.map((category, index) => (
          <div key={index} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-400"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Genders */}
      <div className="mb-6">
        <label className="text-gray-600 font-medium block mb-2">Genders</label>
        {genders.map((gender, index) => (
          <div key={index} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-400"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Colors */}
      <div className="mb-6">
        <label className="text-gray-600 font-medium block mb-2">Colors</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color, index) => (
            <label key={index}>
              <input
                type="radio"
                name="colors"
                value={color}
                checked={filters.colors === color}
                onChange={handleFilterChange}
                className="hidden"
              />
              <div
                title={color}
                style={{ backgroundColor: color.toLowerCase() }}
                className={`h-8 w-8 rounded-full border-2 cursor-pointer ${
                  filters.colors === color ? "ring-2 ring-blue-500" : "border-gray-300"
                } transition hover:scale-105`}
              ></div>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      {renderCheckboxGroup("Size", sizes, "sizes")}

      {/* Materials */}
      {renderCheckboxGroup("Materials", material, "material")}

      {/* Brands */}
      {renderCheckboxGroup("Brands", brands, "brands")}

      {/* Price Range */}
      <div className="mb-6">
        <label className="text-gray-600 font-medium block mb-2">Price Range</label>
        <div className="flex items-center gap-4 mb-2">
          <span>Price:</span>
          <input
            type="number"
            min="0"
            max="100"
            value={inputValue}
            onChange={handleInputChange}
            className="border w-16 h-7 text-center rounded"
          />
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={price}
          onChange={handleSliderChange}
          className="bg-gray-300 w-full h-2 rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex justify-between text-gray-600 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={handleResetFilters}
        className="text-blue-600 underline mt-4"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
