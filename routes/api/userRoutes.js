const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../../models/User");
const keys = require("../../config/keys");

//@route:  GET 'api/users/test'
//@desc: 'tests post route'
//@access: public route
router.get("/test", (req, res) => {
  res.json({ message: "user route works" });
});

//@route:  GET 'api/users/register'
//@desc: 'tests post route'
//@access: public route
router.post("/register", (req, res) => {
  //set up gravatar variable
  const avatar = gravatar.url(req.body.email, {
    s: "200", //size
    r: "pg", // rating
    d: "mm" //default})
  });
  //find if email already exists in our database
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      //if it does, respond with an error saying it already exists
      res.status(404).json({ message: "User Account Already Exists" });
    } else {
      //if it doesnt
      //set up new user object
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
      //hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // Store hash in your password DB.
          newUser.password = hash;
          //save user to database
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route:  GET 'api/users/login'
//@desc: 'tests post route'
//@access: public route
router.get("/login", (req, res) => {
  //formate req.body.email and req.body.Password
  let { email, password } = req.body;
  let { secretOrKey } = keys;
  //check email
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).json({ message: "Invalid Email" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        //sign token
        jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(404).json({ message: "Invalid Password" });
      }
    });
  });
});

//@route:  GET 'api/users/current'
//@desc: Returns current user
//@access: private route

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
