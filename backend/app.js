const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
const authRoutes = require("./routes/authRoutes");

app.use(express.json());

const { MongoClient } = require('mongodb');

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



app.get("/", (req, res) => {
    res.send("Hello from server");
  });

connectToMongoDB();




module.exports = app;


app.use(authRoutes)
