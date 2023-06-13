import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8; // Number of products to display per page

  //In the code you provided, req.query is used to access the query parameters sent in the HTTP request to the getProducts
   // Retrieve the value of the "pageNumber" query parameter
  const page = Number(req.query.pageNumber) || 1; // Current page number, defaults to 1 if not provided


// Retrieve the value of the "keyword" query parameter
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}; // If a keyword is provided in the query parameter, construct a keyword filter for the product name, using a case-insensitive regular expression match

  const count = await Product.countDocuments({ ...keyword }); // Get the total count of products matching the keyword filter
  const products = await Product.find({ ...keyword }) // Fetch products that match the keyword filter
    .limit(pageSize) // Limit the number of products per page
    .skip(pageSize * (page - 1)); // Skip products based on the current page to get the appropriate subset

  res.json({ products, page, pages: Math.ceil(count / pageSize) }); // Return the products, current page number, and total number of pages
});


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


export {
    getProducts,
    getProductById,
 
  }