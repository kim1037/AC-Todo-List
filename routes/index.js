const express = require("express");
const router = express.Router();
// 引入 home 模組程式碼
const home = require("./modules/home");
// 引入 todos 模組程式碼
const todos = require("./modules/todos");
// 引入 users 模組程式碼
const users = require("./modules/users");
const auth = require("./modules/auth");
// 掛載 middleware
const { authenticator } = require("../middleware/auth");

// 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組
router.use("/todos", authenticator, todos);
router.use("/users", users);
router.use("/auth", auth);
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use("/", authenticator, home);

module.exports = router;
