var express = require("express");
const auth = require("../models/user");
var router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", function (req, res) {
  auth.find(function (err, data) {
    res.render("auth.twig", { data });
  });
});
router.post("/", async function (req, res) {
  try {
    const user = await auth.login(req.body.email, req.body.pw);
    console.log(user);
    res.redirect("/home/");
  } catch {
    res.json({ user: "Not Found" });
  }
});

module.exports = router;
