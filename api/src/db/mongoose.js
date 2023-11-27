const mongoose = require("mongoose");
require("dotenv").config();

const dbconnecturl = process.env.NOTER_MONGODB_URL;

mongoose.connect(dbconnecturl);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});
