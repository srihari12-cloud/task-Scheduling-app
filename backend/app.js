const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const User = require("./models/User");
// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

// MongoDB connection
async function connectToMongoDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/TASK_SYNC", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

connectToMongoDB();
const maxAge = 2 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'task sync', {
        expiresIn: maxAge
    });
};
// Root route
app.get("/", (req, res) => {
    res.send("Hello from server");
    console.log("GET / request received");
});
app.post("/login",async(req,res)=>{
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
        res.status(400).json({error:"erroorr"});
    }
    
});
app.post("/signup",async(req,res)=>{
    const { username, email, password, role } = req.body;
    try {

        console.log("compleeeee");
        const user = await User.create({ username, email, password, role });
        
        const token = createToken(user._id);
        
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(user);
        
        res.json({user:user._id});
        console.log("over");
       
        
    } catch (err) {
        
        res.status(404).json({ error:"Error" });
    }
   
    
});



module.exports = app;
