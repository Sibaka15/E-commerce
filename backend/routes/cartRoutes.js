const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper Function to get a cart by user ID or guest ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  }
  if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @Access Public

router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.sendStatus(404).json({ message: "Product Not Found" });
    }

    // Determine if user is logged in or guest
    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.color === color &&
          p.size === size
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += Number(quantity);
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Create a new cart for guest or user

      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.log("Error Adding to Cart", error);
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/cart
// @desc Update the quantity for guest or logged-in user
// @Access Public

router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart Not Found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.color === color &&
        p.size === size
    );
    if (productIndex > -1) {
      // Update quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = Number(quantity);
      } else {
        cart.products.splice(productIndex, 1);
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).send({ message: "Product not Found in Cart" });
    }
  } catch (error) {
    console.log("Error in Update the quanity in the cart", error);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/cart
// @desc Remove a product from the cart
// Access Public

router.delete("/", async (req, res) => {
  const { userId, productId, guestId, size, color } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      res.status(404).json({ message: "Cart not Found" });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in the cart" });
    }
  } catch (error) {
    console.log("Error in deleting the cart", error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/cart
// @desc Logged-in user's or guest user's cart
// Access Public

router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.status(201).json(cart);
    } else {
      res.status(404).json({ message: "Cart Not Found" });
    }
  } catch (error) {
    console.log("Error getting the Cart items", error);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user on login
// @access Private

router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;
  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });
    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.send(400).json({ message: "Guest Cart is Empty" });
      }
      if (userCart) {
        // Merge guest cart into user
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.price === guestItem.price &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );
        await userCart.save();

        // Remove the guest cart
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.log("Error deleting cart for guest", error);
        }
        res.status(200).json(userCart);
      } else {
        // If user has no existing cart assign the guest cart to user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;

        await guestCart.save();

        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: "Guest Cart Not Found" });
    }
  } catch (error) {
    console.log("Merge Error", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
