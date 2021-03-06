let Database = [
    {   id : 1,
        username : 'cindy',
        email : "cindy@gmail.com",
        password : "test",
        reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}],
        role: 'admin'
    },
    
]

const userModel = {
    findOne: (email) => {
      const user = Database.find((user) => user.email === email);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
      const user = Database.find((user) => user.id === id);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with id: ${id}`);
    
    },
    findByGithubId: (id) => {
      const user = Database.find((user) => user.id === id || user.id == id);
      if (user) {
          return user;
      }
      return false;
  }
  };
  

module.exports = { Database, userModel};