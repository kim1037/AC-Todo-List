const express = require("express");
const router = express.Router();
const User = require("../../models/user");
// 引用 passport
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

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
