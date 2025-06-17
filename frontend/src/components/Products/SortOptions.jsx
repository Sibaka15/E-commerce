import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    if (sortBy) {
      searchParams.set("sortBy", sortBy);
    } else {
      searchParams.delete("sortBy");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-end space-x-2 p-4 bg-white rounded-lg shadow-sm">
      <label htmlFor="sort" className="text-sm text-gray-700 font-medium">
        Sort by:
      </label>
      <select
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        id="sort"
        className="border border-gray-300 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-3 py-1.5 text-gray-700"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
