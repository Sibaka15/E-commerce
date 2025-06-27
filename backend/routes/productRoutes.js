const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/products
// @desc Create a new Product
// @sccess Private /Admin

router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createProduct = await product.save();
    console.log("Prodcut added successfully...");
    res.status(201).json(createProduct);
  } catch (error) {
    console.log("Prodct adding fail", error);
    res.status(500).send("Server Error");
  }
});

// Update Product
// @PUT /api/product/:id
// access Private/admin

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      //save the upadted product
      const updatedProduct = await product.save();
      console.log("Product Updated Successfully");
      res.status(201).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Updating the Product Error :: ", error);
    res.status(500).send("Server error");
  }
});

// @route DELETE /api/product/:id
// Access private/admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      await product.deleteOne();
      console.log("Product deleted Successfully");
      res.json({ message: "Product Removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Deleting the Product Error", error);
    res.status(500).send("server error");
  }
});

// @route /api/products
// desc Get all the products with optional query filters
// Access Public

router.get("/", async (req, res) => {
  try {
    const {
      collection,
      color,
      size,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // Filter logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collection = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.size = { $in: size.split(",") };
    }

    if (color) {
      query.color = { $in: [color] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sort Logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "poplularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // Fetch the products from DB

    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route Get /api/products/best-seller
// @desc Get the data with Highest rating
// @access Public

router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(402).json({ message: "Best Seller Not Found" });
    }
  } catch (error) {
    console.log("Error geting Best-seller", error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/new-arrivals
// @desc get lastest 8 product - Creation date
// @Access public

router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    if (newArrivals) {
      res.json(newArrivals);
    } else {
      res.status(404).json({ message: "New Arrivals Not Found" });
    }
  } catch (error) {
    console.log("Error Getting the new-arrivals", error);

    res.status(500).send("Server Error");
  }
});

// @route /api/products/:id
// @desc Get a single product by ID
// Access Public

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error getting a product");
    res.status(500).send("Server Error");
  }
});

// @route /api/products/similar/:id
// @desc Get the simalr product based on the current product's gender and category
// @access Public

router.get("/similar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }
    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);
    res.json(similarProducts);
  } catch (error) {
    console.log("Error in getting Similar Product", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
