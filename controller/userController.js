const database = require("../database").Database;
const userModel = require("../database").userModel;


const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}
const getUserByGithubIdOrCreate = (profile) => {
  let user = userModel.findByGithubId(profile.id);
  if (user) {
      return user;
  } else {
      let createdUser = createGithubUser(profile);
      return createdUser;
  }
};

let createGithubUser = (profile) => {
  let newUser = {
      id: profile.id,
      username: profile.username,
      password: null,
      reminders: [],
  };
  database.push(newUser);
  return newUser;
};

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById, getUserByGithubIdOrCreate, createGithubUser
};
