const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email, password })
    .then((user) => {
      if (user) {
        res.render("index", { firstName: user.firstName });
      } else {
        const errorMessage = `Wrong email or password, please try again.`;
        res.render("login", { errorMessage });
      }
    })
    .catch((e) => console.log(e));
});

module.exports = router;
