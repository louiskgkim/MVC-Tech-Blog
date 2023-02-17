const { User } = require('../models');

const userData = [
  {
    username: "Louis",
    email: "Louistest@gmail.com",
    password: "123456"
  },
  {
    username: "Sarah",
    email: "Sarah@hotmail.com",
    password: "password"
  },
  {
    username: "James",
    email: "james1@gmail.com",
    password: "password123"
  },
  {
    username: "Daniel",
    email: "Daniel@gmail.com",
    password: "damndaniel"
  },
  {
    username: "Ollie",
    email: "Ollie@hotmail.com",
    password: "doggo"
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;