let database = require("../database");
const userModel = require("../database").userModel;
const userController = require("./userController")

let remindersController = {
  list: (req, res) => {
    console.log(req.user.id)
    console.log(req.user)
    res.render("reminder/index", { reminders: userController.getUserById(req.user.id).reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.user].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[req.user].reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database[req.user].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[req.user].reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.user].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let updatedReminder = database.cindy.reminders;
    // id number 
    let reminderToFind = req.params.id; 
    let searchUpResult = database[req.user].reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });
    updatedReminder[searchUpResult] = {
      id: reminderToFind,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    };
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    let reminderIdToDelete = parseInt(req.params.id);
    let foundReminder = database[req.user].reminders.find(function (reminder) {
      for (i=0; i<= database[req.user].reminders.length; i+1) {
        if (reminder.id == reminderIdToDelete);
        return i;
      }
    });
    database[req.user].reminders.splice(foundReminder, 1);
    res.redirect("/reminders");
 
    

  }
};

module.exports = remindersController;
