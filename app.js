const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
// 引入路由器時，路徑設定為 /routes 會自動去找目錄下的index檔
const routes = require("./routes");
const session = require("express-session");
const usePassport = require("./config/passport");
const flash = require("connect-flash");
require("./config/mongoose");
const app = express();
const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config;
}

//set view template
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
//設定副檔名
app.set("view engine", "hbs");
//use session 要放在其他use的最上方才會有connet.sid
app.use(
  session({
    secret: process.env.SECRET,
    resave: false, //在沒有修改 session 的情況下，是否重新存儲 session 資訊
    saveUninitialized: true, //強制將未初始化的 session 存回 session store。
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app);
app.use(flash());
// 檢查登入狀態
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});
//使用路由模組
app.use(routes);

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:3000`);
});
