const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// Define the User schema with validation and required fields
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true,
        trim: true 
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        trim: true, 
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    role: {
        type: String,
        enum: ['manager', 'employee'],
        required: true
    }
});

// Pre-save middleware to hash the password before saving the user
UserSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10); // Specify salt rounds
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); 
    }
});

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    console.log("insides "+user);
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        console.log("insideauth"+auth);
        if (auth) {
            return user;
        }
        throw Error("Incorrect email or password"); 
    }
    throw Error("Incorrect email or password"); 
};


const User = mongoose.model("User", UserSchema);
module.exports = User;