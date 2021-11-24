const passport = require("passport");
const GitHubStrategy = require('passport-github').Strategy;
const userController = require("../controller/userController");

const githubLogin = new GitHubStrategy({
    
    clientID: "73782081ded358a9a4fd",
    clientSecret: "9d41600cf817e2ce0b9bf9e9629ce788772a6f63",
    callbackURL: "http://localhost:3001/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    let user = userController.getUserByGithubIdOrCreate(profile);
    return cb(null, user);
  },
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    let user = userController.getUserById(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found." }, null);
    }
});


module.exports = passport.use(githubLogin);