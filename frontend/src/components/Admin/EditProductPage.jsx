import React, { useState } from "react";

const EditProductPage = () => {
  const [productdata, setProductData] = useState({
    name: "",
    description: "",
    countInStock: 0,
    sku: "",
    brand: "",
    sizes: ['S','M'],
    colors: ['red','blue'],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/200?random=70",
      },
      {
        url: "https://picsum.photos/200?random=72",
      },
    ],
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) =>{
    const file = e.target.files[0]
    console.log(file);
    
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(productdata);
    
  }

  return (
    <div className="max-w-5xl p-6 shadow-md rounded-md mx-auto">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block font-semibold mb-2">Name</label>
          <input
            type="text"
            className="border w-full border-gray-300 p-2"
            name="name"
            value={productdata.name}
            onChange={handleChange}
          />
        </div>
        {/* Description */}
        <div className="mb-8">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            rows={4}
            name="description"
            className="border w-full border-gray-300 p-2"
            value={productdata.description}
            onChange={handleChange}
          ></textarea>
          {/* Price */}
          <div className="block mb-8">
            <label className="block font-semibold mb-2">Price</label>
            <input
              type="number"
              className="border w-full border-gray-300 p-2"
              name="price"
              value={productdata.price}
              onChange={handleChange}
            />
          </div>
          {/* Count in Stock */}
           <div className="block mb-8">
            <label className="block font-semibold mb-2">Count in Stock</label>
            <input
              type="number"
              className="border w-full border-gray-300 p-2"
              name="countInStock"
              value={productdata.countInStock}
              onChange={handleChange}
            />
          </div>
          {/* SKU */}
           <div className="block mb-8">
            <label className="block font-semibold mb-2">SKU</label>
            <input
              type="text"
              className="border w-full border-gray-300 p-2"
              name="sku"
              value={productdata.sku}
              onChange={handleChange}
            />
          </div>

          {/* Sizes */}
           <div className="block mb-8">
            <label className="block font-semibold mb-2">Sizes</label>
            <input
              type="text"
              className="border w-full border-gray-300 p-2"
              name="sizes"
              value={productdata.sizes.join(',')}
              onChange={(e)=>setProductData({...productdata,sizes:e.target.value.split(',').map((size)=>size.trim())})}
            />
          </div>

          {/* Colors */}
           <div className="block mb-8">
            <label className="block font-semibold mb-2">Sizes</label>
            <input
              type="text"
              className="border w-full border-gray-300 p-2"
              name="colors"
              value={productdata.colors.join(',')}
              onChange={(e)=>setProductData({...productdata,colors:e.target.value.split(',').map((color)=>color.trim())})}
            />
          </div>

        {/* Image upload */}
        <div className="mb-6">
            <label  className="block font-semibold mb-2">Image Upload</label>
            <input type="file" onChange={handleImageUpload} />
            <div className="flex gap-4 mt-4">
                {
                    productdata.images.map((image,index)=>{
                        return(
                            <div key={index}>
                                <img src={image.url} alt={productdata.name} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                            </div>
                        )
                    })
                }
            </div>
        </div>

        <button type="submit" className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600 transition-colors">Update product</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
