const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [1,"Title name cannot be empy"],
        maxLength: [50, "This is too much man chill"]
    },
    type:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        minLength: [1,"Description cannot be empy"],
        maxLength: [99, "This is too much man chill"]
    },
    price:{
        type: Number,
        required: true,
    },
    size:{
        type: String,
        required: true,

    },
    condition:{
        type: String,
        required: true,
    },
    style: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
    }

    //userRole: {
        // type: String
        // enum: ["admin","regular","SuperAdmin"],
        // default: "regular"
    // }

},
{
    timestamps: true // means createdAt and updatedAt
});
const Product = mongoose.model("Product", productSchema);

module.exports = {Product};