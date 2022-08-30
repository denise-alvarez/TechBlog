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

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: {
        exclude: ["user_id", "updatedAt"],
      },

      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt"],
          },
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: { exclude: ["password"] },
          },
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });
      console.log("status", req.session.logged_in);
      res.render("single-post", {
        payload: { posts: [post], logged_in: req.session.logged_in },
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
