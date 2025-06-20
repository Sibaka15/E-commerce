import React, { useState } from "react";
import PayPalButton from "./PayPalButton";
import { useNavigate } from "react-router-dom";

const cart = {
  products: [
    {
      productId: 1,
      name: "T-shrit",
      size: "M",
      color: "Red",

      price: 99,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: 2,
      name: "Jeans",
      size: "L",
      color: "Blue",

      price: 19,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  totalPrice: 195,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successfully", details);
    navigate("/order-confirmation");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto py-10 px-6 gap-8 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-2xl uppercase mb-6">Checkout</h3>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact details</h3>
          <div className="mb-4">
            <label className="text-gray-700 block">Email</label>
            <input
              type="email"
              value="example@gamil.com"
              className="w-full border p-2 rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4"> Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 block"> First Name</label>
              <input
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                type="text"
                value={shippingAddress.firstName}
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 block"> Last Name</label>
              <input
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                type="text"
                value={shippingAddress.lastName}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block"> Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postCode}
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postCode: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="number"
              value={shippingAddress.phone}
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="bg-black text-white w-full px-2 py-3 rounded-lg mt-4"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-xl mb-4">Pay with Paypal</h3>
                <PayPalButton
                  amount={100}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("Payment failed ,Retry payment")}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="text-lg mb-4">Order Summary</div>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => {
            return (
              <div
                key={index}
                className="flex items-start justify-between py-2 border-b"
              >
                <div className="flex items-start">
                  <img
                    src={product.image}
                    className="w-20 h-20 object-cover mr-4 cursor-pointer"
                  />
                  <div>
                    <h3 className="text-md">{product.name}</h3>
                    <p className="text-gray-500">Size: {product.size}</p>
                    <p className="text-gray-500">Color: {product.color}</p>
                  </div>
                </div>
                <div>
                    <p className="text-xl">${product.price}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-start justify-between text-lg mb-4">
            <p>Sub Total</p>
            <p>${cart.totalPrice}</p>
        </div>
        <div className="flex items-start justify-between text-lg mb-4">
            <p>Shipping</p>
            <p>Free</p>
        </div>
        <div className="flex items-center justify-between text-lg mt-5 border-t pt-4">
            <p>Total</p>
            <p>${cart.totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
