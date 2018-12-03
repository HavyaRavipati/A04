//@author Akhila Gandra 
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

  _productid: { type: Number, required: true },
  productName: {
    type: String,
    required: true,
    default: ''
  }, 
  productDescription: {
    type: String,
    required: true,
    default: ''
  }, 
  price: { 
    type: Number,
    required: false,
    default: 0,
    min: 0,
    max: 50000
  },
  productCategory: { 
    type: String,
    required: true,
    default: ''
  },
  sellerId: { 
    type: Number,
    required: true,
  }
})
module.exports = mongoose.model('Product', ProductSchema)