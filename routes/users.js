var express = require("express");
var User = require("../models/User");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// register
router.post("/register", async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    // res.status(201).json({ user });
    var token = await user.signToken();
    res.json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

// login
router.post("/login", async (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "email/password is required" });
  }
  try {
    let user = await User.findOne({ email });
    // no user
    if (!user) {
      res.status(400).json({ error: "email is invalid " });
    }
    // pasword compare
    let result = await user.verifyPassword(password);
    if (!result) {
      res.status(400).json({ error: "password is invalid " });
    }
    // generate token
    var token = await user.signToken();
    res.json({ user: user.userJSON(token) });
    return token;
  } catch (error) {
    next(error);
  }
});
module.exports = router;
