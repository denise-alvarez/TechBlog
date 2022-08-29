const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");

const users = [
  {
    username: "Denise",
    password: "Denise01",
  },

  {
    username: "Makayla",
    password: "Makayla01",
  },

  {
    username: "Violet",
    password: "Violet01",
  },
];

const posts = [
  {
    title: "why is the sky blue?",
    content: "just go with it",
    user_id: 1,
  },

  {
    title: "I am ready for Friday",
    content: "What are we doing??!",
    user_id: 2,
  },

  {
    title: "We dont deserve dogs",
    content: "My dog's name is Rainbow she is the best Chihuahua ever",
    user_id: 3,
  },
];

const comments = [
  {
    content: "this is great",
    user_id: 1,
    post_id: 1,
  },

  {
    content: "this is amazing",
    user_id: 2,
    post_id: 2,
  },
];


const plantSeeds = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(users, { individualHooks: true });
  await Post.bulkCreate(posts);
  await Comment.bulkCreate(comments);
};

plantSeeds();