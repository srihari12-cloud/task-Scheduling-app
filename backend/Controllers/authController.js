const User = require("../models/User");

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

module.exports.signup_get = (req, res) => {
    res.render("signup");
};

module.exports.login_get = (req, res) => {
    res.render("login");
};  

module.exports.signup_post = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const user = await User.create({ username, email, password, role });
        res.status(201).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.login_post = async (req, res) => {
    const { username, email, password, role } = req.body;
    console.log(username, email, password, role);
    res.send("Handle login form submission here");
};


