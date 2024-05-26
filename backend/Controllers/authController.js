const User = require("../models/User");
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);

    let errors = { username: "", email: "", password: "", role: "" };

    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        errors[field] = `${field} is already taken`;
    }
    if (err.message.includes("validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

const maxAge = 2 * 24 * 60 * 60; 
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'task sync', {
        expiresIn: maxAge
    });
};

module.exports.signup_get = (req, res) => {
    res.render("signup");
};

module.exports.login_get = (req, res) => {
    res.render("login");
};

module.exports.signup_post = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {

        console.log("compleeeee");
        const user = await User.create({ username, email, password, role });
        //const token = createToken(user._id);
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.json({user:user._id});
        
    } catch (err) {
        const errors = handleErrors(err);
        res.status(404).json({ errors });
    }
};

module.exports.login_post = async(req, res) => {
    const { email, password } = req.body;
    console.log("mnnnn"+email);
    try {

        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.json({ user: user._id });
        console.log("compleeeee");

    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
};

