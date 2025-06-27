const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Product = require("./models/Product");
const products = require("./data/products");
const Cart = require('./models/Cart')

dotenv.config()

mongoose.connect(process.env.MONGO_URI);

const seeder = async () => {
  try {
    // Clear all the data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create an admin user
    const createUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });
    // Assign the default user ID to each product

    const sampleProducts = products.map((product) => {
      return { ...product, user:createUser._id };
    });

    // Insert the products into the database
    await Product.insertMany(sampleProducts)

    console.log('Products Added Successfully...');
    process.exit()
    
  } catch (error) {
    console.log('Error Seeding the data ',data);
    process.exit(1)
  }
};

seeder()