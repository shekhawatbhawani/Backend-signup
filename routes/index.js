var express = require("express");
var router = express.Router();
let contactModel = require("./users");
var passwordValidator = require('password-validator');

var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(8)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these  

/* GET home page. */
router.get("/", function (req, res) {
  res.render("contact");
});
router.get("/contactlog", function (req, res) {
  res.render("contactlog");
});
router.get("/contact", function (req, res) {
  res.render("contact");
});

/* contact page */

router.post("/create", async (req, res) => {
  try {
    let user = await contactModel.find({ name: req.body.name });
    const passwordValidation = schema.validate(req.body.password);
    let invalid = "Password does not meet the required criteria. It should be at least 8 characters long, contain uppercase letters, lowercase letters, at least 2 digits, and no spaces"
    if (user.length != 0) {
      res.render("contactlog");
    }
    if (!passwordValidation) {
      res.render("contact");
    } 
      else {
      const newuser = await contactModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.render("contactlog");
    }
  } catch (error) {}
});
router.post("/login", async (req, res) => {
  try {
    let user = await contactModel.find({ email: req.body.email, password:req.body.password});
    console.log(user);
    
    if (user.length != 0) {
      res.render("index");
    } else {
      res.render("contact");
    }
  } catch (error) {}
});




router.get("/showdata", async (req, res) => {
  let data = await contactModel.find();
  res.send(data);
});


router.get("/delete", async (req, res) => {
  let data = await contactModel.deleteMany();
  res.send(data);
});



module.exports = router;
