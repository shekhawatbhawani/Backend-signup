const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/school");

// Define schema of students

let contactSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});


module.exports = mongoose.model("contact",contactSchema);