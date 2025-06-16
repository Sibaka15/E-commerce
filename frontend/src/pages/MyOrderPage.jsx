import React, { useEffect, useState } from "react";

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);

  const mockOrders = [
    {
      _id: "1234",
      createdAt: new Date(),
      shippingAddress: {
        city: "Bangalore",
        country: "India",
      },
      orderItems: [
        {
          name: "Product 1",
          image: "https://picsum.photos/500/500/?random=38",
        },
      ],
      totalPrice: 100,
      isPaid: true,
    },
    {
      _id: "5698",
      createdAt: new Date(),
      shippingAddress: {
        city: "Bangalore",
        country: "India",
      },
      orderItems: [
        {
          name: "Product 2",
          image: "https://picsum.photos/500/500/?random=39",
        },
      ],
      totalPrice: 120,
      isPaid: false,
    },
  ];

  useEffect(() => {
    setOrders(mockOrders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-4">
      <h2 className="text-xl mb-6 font-bold sm:text-2xl">My Orders</h2>
      <div className="relative shadow-lg sm:rounded-lg overflow-hidden ">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-2">Image</th>
              <th className="py-2 px-4 sm:py-2">Order Id</th>
              <th className="py-2 px-4 sm:py-2">Created At</th>
              <th className="py-2 px-4 sm:py-2">Shipping Address</th>
              <th className="py-2 px-4 sm:py-2">Items</th>
              <th className="py-2 px-4 sm:py-2">Price</th>
              <th className="py-2 px-4 sm:py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:border-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      className="w-10 h-10 object-cover rounded-lg sm:w-14 sm:h-14"
                    />
                  </td>
                  {/* <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.createdAt}
                  </td> */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 ">
                    {order.shippingAddress ? `${order.shippingAddress.city},${order.shippingAddress.country}` : 'N/A'}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.orderItems.length}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    $ {order.totalPrice}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span className={`${order.isPaid ? 'bg-green-100 text-green-700':'bg-red-100 text-red-700'} px-2 py-2 rounded-lg text-xs font-medium sm:text-sm`}>
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no Orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderPage;
