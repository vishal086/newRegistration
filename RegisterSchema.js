const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name : String,
    branch : String,
    roll : String,
    email : String,
    password : String,
    cPassword : String,
})

const Product = mongoose.model('Product',userSchema)

module.exports = Product;