let database = require("../database");
const express = require("express");
const passport = require("../middleware/passport");

const { forwardAuthenticated } = require("../middleware/checkauth");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
    
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
    console.log(req.body)
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
  })(req, res)
  },

  registerSubmit: (req, res) => {
    // implement
    database.push({
      id : Database.length + 1,
        email : req.body.email,
        password : req.body.password,
        reminders : []
  
    })
    (req, res)
  }
}

module.exports = authController;
