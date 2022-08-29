const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: { exclude: ["user_id", "updatedAt"] },
      include: [
        { model: User, attributes: { exclude: ["password", "createdAt"] } },
        { model: Comment },
      ],
    });

    const posts = postData
      .map((post) => post.get({ plain: true }))
      .map((a) => ({ ...a, currentUserId: req.session.user_id }));

    res.render("homepage", {
      payload: { posts, logged_in: req.session.logged_in },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});