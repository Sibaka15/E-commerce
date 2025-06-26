import React from "react";

const checkout = {
  _id: "123456",
  createdAt: new Date(),
  checkedoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "black",
      size: "M",
      price: 150,
      quantity: 1,
      image: "https://picsum.photos/150?random=51",
    },
    {
      productId: "2",
      name: "T-shrit",
      color: "blue",
      size: "M",
      price: 1910,
      quantity: 2,
      image: "https://picsum.photos/150?random=52",
    },
  ],
  shippingAddress: {
    address: "18/7A VM Street",
    city: "Bangalore",
    country: "India",
  },
};

const calculateEstimatedDelivery = (createdAt) => {
  const orderDate = new Date(createdAt);
  orderDate.setDate(orderDate.getDate() + 10);
  return orderDate.toLocaleDateString();
};

const OrderConfirmation = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-6">
        Thank you for the order
      </h1>
      {checkout && (
        <div className="rounded-lg border p-6">
          <div className="flex justify-between mb-16">
            <div>
              <h2 className="text-xl font-semibold">Order ID:{checkout._id}</h2>
              <p className="text-gray-500">
                Order date:{new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated delivery */}
            <div>
              <p className="text-emerald-500 text-sm">
                Estimed Delivery :
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Order items */}
          <div className="mb-20">
            {checkout.checkedoutItems.map((item, index) => {
              return (
                <div key={index} className="flex mb-4 items-center">
                  <img
                    src={item.image}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-md font-semibold">{item.name}</h4>
                    <p className="text-gray-500">
                      {item.color} | {item.size}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-md">{item.price}</p>
                    <div className="text-sm text-gray-500">
                      Qty:{item.quantity}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Payment and delivery */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">Paypal</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
