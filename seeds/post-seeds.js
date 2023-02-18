const { Post } = require('../models');

const postData = [
  {
    title: "Cookies",
    post_content: "I've really been into cookies these days. All because I have keep clearing cache and cookies.",
    user_id: 3
  },
  {
    title: "Weather Dashboard out now!",
    post_content: "This weather dashboard will show today's current weather data and the next five days weather forecast of the searched city.",
    user_id: 1
  },
  {
    title: "Huge Tech Layoffs..",
    post_content: "Massive tech companies are beginning massive layoffs during tough times.",
    user_id: 2

  },
  {
    title: "The Housing Market",
    post_content: "No comment. This is just crazy!",
    user_id: 5
  },
  {
    title: "Work Day Scheduler now available",
    post_content: "The purpose of this calendar app allows a user to save events for each hour of the day. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery & Bootstrap. Each time block is color coded to indicate whether it is in the past, present, or future. Any event will be saved in the local storage.",
    user_id: 4
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;