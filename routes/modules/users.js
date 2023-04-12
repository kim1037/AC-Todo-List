const express = require("express");
const router = express.Router();
const User = require("../../models/user");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        res.redirect("/");
      } else {
        const errorMessage = `Wrong email or password, please try again.`;
        res.render("login", { errorMessage });
      }
    })
    .catch((e) => console.log(e));
});

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const errorMessage = `The email already exists.`;
        res.render("register", {
          name,
          email,
          password,
          confirmPassword,
          errorMessage,
        });
      } else {
        User.create({ name, email, password })
          .then(() => res.redirect("/"))
          .catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
});

module.exports = router;
