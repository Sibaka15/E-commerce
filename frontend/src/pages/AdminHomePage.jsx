import React from "react";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
  const orders = [
    {
      _id: "456",
      user: {
        name: "Siva",
      },
      totalPrice: 110,
      status: "Processing",
    },
    
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">$100</p>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">$100</p>
          <Link
            to="/admin/orders"
            className="text-blue-500 mt-2 block hover:underline"
          >
            Manage Orders
          </Link>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl">$100</p>
          <Link
            to="/admin/products"
            className="text-blue-500 mt-2 block hover:underline"
          >
            Manage Products
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-500">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700 ">
                    <tr>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">User</th>
                        <th className="py-3 px-4">Total Price</th>
                        <th className="py-3 px-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length > 0 ?(
                            orders.map((item,index)=>{
                            return(
                                <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                                    <th className="p-4">{item._id}</th>
                                    <th className="p-4">{item.user.name}</th>
                                    <th className="p-4">{item.totalPrice}</th>
                                    <th className="p-4">{item.status}</th>
                                </tr>
                            )
                        })
                        ):(
                            <tr className="text-center border-b">
                                <th className="mt-4 text-gray-500 p-4" colSpan={4}> No Recent Orders</th>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
