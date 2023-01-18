var express = require("express");
var router = express.Router();
var auth = require("../middelwares/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hello");
});

router.get("/protected", auth.verifyToken, function (req, res, next) {
  res.json({ user: "protected route" });
});
module.exports = router;
