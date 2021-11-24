let database = require("../database");
const userModel = require("../database").userModel;
const userController = require("./userController")

let remindersController = {
  list: (req, res) => {
    
    
    res.render("reminder/index", { reminders: userController.getUserById(req.user.id).reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = userController.getUserById(req.user.id).reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: userController.getUserById(req.user.id).reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: userController.getUserById(req.user.id).reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    userController.getUserById(req.user.id).reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult =  userController.getUserById(req.user.id).reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    
    // id number 
    let reminderToUpdate = req.params.id; 
    let searchReminder = userController.getUserById(req.user.id).reminders.find(reminders => reminders.id == reminderToUpdate ) 
     
    searchReminder.title =  req.body.title
    searchReminder.description = req.body.description
    if (req.body.completed == 'true'){
    searchReminder.completed = true
    }
    else{
      searchReminder.completed = false

    }
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    let reminderIdToDelete = parseInt(req.params.id);
    let searchResult = userController.getUserById(req.user.id).reminders.find(reminders => reminders.id == reminderIdToDelete )
   	if (searchResult != undefined) {
		let reminder_index = userController.getUserById(req.user.id).reminders.indexOf(searchResult)
		userController.getUserById(req.user.id).reminders.splice(reminder_index, 1)
		res.redirect("/reminders")
  }
  else{
    res.render("reminder not found")
  }

  }
};

module.exports = remindersController;
