const express = require("express");
const app = express();
const path = require("path");
const { ensureAuthenticated } = require("./middleware/checkAuth");
const authRoute  = require("./controller/authRoute");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const session = require("express-session");
const passport = require("./middleware/passport");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(ejsLayouts);

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

// Routes start here
app.use("/auth", authRoute);


app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id",ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id",ensureAuthenticated, reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id",ensureAuthenticated, reminderController.delete);

//changed this to work with express router instead
// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
//app.get("/register", authController.register);
//app.get("/login", authController.login);
//app.post("/register", authController.registerSubmit);
//app.post("/login", authController.loginSubmit);
//app.get("/github", authController.github)
//app.get("/github/callback", authController.githubcallback)



app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
