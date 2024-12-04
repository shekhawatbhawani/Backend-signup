var express = require("express");
var router = express.Router();
let contactModel = require("./users");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});
router.get("/contact", function (req, res) {
  res.render("contact");
});
router.get("/about", function (req, res) {
  res.render("about");
});
router.get("/create", async function (req, res) {
  const createStudent = await studentModel.create({
    name: "shubhanshi",
    age: 21,
    grade: "A",
    address: "Bengali",
  });
  res.send(createStudent);
});
router.get("/getdata", async function (req, res) {
  const studentData = await studentModel.find();
  res.send(studentData);
});
router.get("/delete", async function (req, res) {
  const deletedStudent = await studentModel.deleteMany();
  res.send(deletedStudent);
});

router.get("/generate", async function (req, res) {
  await studentModel.deleteMany();
  let namesData = [
    "Ramesh",
    "Shubham",
    "Akhilesh",
    "Maaz",
    "Hemant",
    "bhawani",
  ];
  let addressData = [
    "Bhopal",
    "Sikar",
    "Jaipur",
    "Jodhpur",
    "Kanpur",
    "Varanasi",
  ];
  let gradeData = ["A", "B", "C", "D", "E", "F"];
  let ageData = [21, 22, 23, 24, 25, 26];

  for (let i = 0; i < 10; i++) {
    let randomIndex = Math.floor(Math.random() * 5) + 1;

    studentModel.create({
      name: namesData[randomIndex],
      address: addressData[randomIndex],
      age: ageData[randomIndex],
      grade: gradeData[randomIndex],
    });
  }
  res.send("data is Created");
});

// Contact Form Message Storage
router.post("/create-request", async (req, res) => {
  try {
    await contactModel.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      contact: req.body.number,
    });
  } catch (error) {
    console.log("Some Error Occured");
  }
  res.send("Data Submitted");
});

// Contact Form data Render
router.get("/show-request", async (req, res) => {
  let data = await contactModel.find();
  res.send(data);
});
module.exports = router;
