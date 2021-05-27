const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

// routes

var UserRouter = require("./routes/Users");



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb+srv://palash:spaceword@cluster0.ofm4x.mongodb.net/mlh-abracadabra?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/user", UserRouter);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
