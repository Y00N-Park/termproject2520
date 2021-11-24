let database = require("../database").Database;
const express = require("express");
const passport = require("../middleware/passport");
const github = require("../middleware/github")

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
    console.log(req.body)
    let userdata = {
      id : database.length + 1,
        email : req.body.email,
        password : req.body.password,
        reminders : []
  
    }; 
    database.push(userdata);
   
    (req, res);
  },

  github : (req,res) => {
    res.render("/github",  github.authenticate('github'))
    
  },

  githubcallback: (req,res) => {
  res.render('/github/callback', 
  github.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/reminders');

  });

  }
}

module.exports = authController;
