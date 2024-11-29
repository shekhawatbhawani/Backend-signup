var express = require('express');
var router = express.Router();
let studentModel = require("./users")

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/contact', function(req, res) {
  res.render('contact');
});
router.get('/about', function(req, res) {
  res.render('about');
});
router.get('/create',async function(req, res) {
  const createStudent = await studentModel.create({
    name : "shubhanshi",
    age : 21,
    grade : "A",
    address : "Bengali"
  })
  res.send(createStudent)
});
router.get('/getdata',async function(req, res) {
  const studentData = await studentModel.find()
  res.send(studentData)
});
router.get('/delete',async function(req, res) {
  const deletedStudent = await studentModel.findOneAndDelete({name:"Lokesh Singh"})
  res.send(deletedStudent)
});

module.exports = router;
