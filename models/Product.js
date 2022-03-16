const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const productSchema = mongoose.Schema({
    title:{
        type: String,
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
    brand:{
        type: String,
        required: true,

    },
    condition:{
        type: String,
        required: true,
    },

    color: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
    },
    seller:{
        type:String
    },

    sellerId:{
        type:String
    },
    productImage:{
        type: String,
        default: "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png"
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