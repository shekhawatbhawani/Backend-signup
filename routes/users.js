const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/school");

// Define schema of students

let studentSchema = mongoose.Schema({
  name: String,
  age: Number,
  grade: String,
  address: String,
});


module.exports = mongoose.model("Student",studentSchema);