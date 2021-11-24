const express = require("express");
const passport = require("../middleware/passport");
const github = require("../middleware/github");
const { forwardAuthenticated, adminCheck } = require("../middleware/checkauth");
let database = require("../database").Database;
const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/reminders",
        failureRedirect: "login",
    })
);

router.get('/github',
  github.authenticate('github'));

router.get('/github/callback', 
  github.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/reminders');
  });

router.get("/register", forwardAuthenticated, (req, res) => res.render("auth/register"));

router.post("/register", (req,res) => {
  request('https://api.unsplash.com/photos/random/?client_id=6C3Sb8DdA3n2_vIhdEA_II_ENcwFrFhp3f7wG1acklk', { json: true }, (err, res1, random_image) => {
  if (err) {
    console.log(err)
  }
  else{
  profile_image = random_image.urls.thumbs

    database.push({
        id: database.length +1,
        email: req.body.email,
        password: req.body.password,
        reminders: [],
        role : 'user',
        profile_image : profileImage
    })
    res.redirect("login");
      (req, res);
  }
})

});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("login");
});

router.get ("/admin", adminCheck ,(req, res) => {
  req.sessionStore.all((err, sessions) => {
    if(err){
      console.log(err)
    }
    else{
      res.render("auth/admin" , {user : req.user, sessions : sessions})
    }

  })
}) 

module.exports = router;