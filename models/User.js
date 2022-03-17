const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [1,"First name cannot be empy"],
        maxLength: [99, "This is too much man chill"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [1,"Last name cannot be empy"],
        maxLength: [99, "This is too much man chill"]
    },
    emailAddress:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: [8,"Password must be at least 8 characters long"]

    },
    profileImage:{
        type: String,
        default: "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png"
    },

    //userRole: {
        // type: String
        // enum: ["admin","regular","SuperAdmin"],
        // default: "regular"
    // }

},
{
    timestamps: true // means createdAt and updatedAt
});

//verify pass
userSchema.methods.verifyPassword = function(password){
    console.log(password);
    console.log(this.password);
    return bcrypt.compareSync(password, this.password);
    }

const User = mongoose.model("User", userSchema);

module.exports = {User};