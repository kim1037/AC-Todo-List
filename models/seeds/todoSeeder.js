const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config;
}
const Todo = require("../todo"); // 載入 todo model
const User = require("../user");
const db = require("../../config/mongoose");
const SEED_USER = {
  name: "tester",
  email: "tester@test.com",
  password: "test123",
};

db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id;
      return Promise.all(
        Array.from({ length: 10 }, (_, i) =>
          Todo.create({ name: `name-${i}`, userId })
        )
      );
    })
    .then(() => {
      console.log("done");
      process.exit(); //產生完之後關閉這段 Node 執行程序
    });
});
