//@author Marton Bagoly
const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({

  _id: { type: Number, required: true, default: 12345 },
  firstname: {
    type: String,
    required: true,
    default: 'Marton'
  },
  lastname: {
    type: String,
    required: true,
    default: 'Bagoly'
  },
  age: {
    type: Number,
    required: false,
    default: 22
  },
  phonenumber: {
      type: Number,
      required: true,
      default: 00000000000
  },
  address: {
      type: String,
      required: true,
      default: 'address'
  }
})
module.exports = mongoose.model('Customer', CustomerSchema)
