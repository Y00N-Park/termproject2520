const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { database } = require("../models/userModel");
const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

// register
router.get("/register", forwardAuthenticated, (req, res) => res.render("login"));
router.post("/register", (req, res) => {
  try {
    database.push({
      id: database.length + 1,
      username: req.body.username,
      email: req.body.password
    })
    res.redirect("/login");
  } catch {
      res.redirect("/register");
  }
});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
