const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
// 引入路由器時，路徑設定為 /routes 會自動去找目錄下的index檔
const routes = require("./routes");
const session = require("express-session");

require("./config/mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

//set view template
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
  })
); //設定副檔名
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//使用路由模組
app.use(routes);
//use session
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false, //在沒有修改 session 的情況下，是否重新存儲 session 資訊
    saveUninitialized: true, //強制將未初始化的 session 存回 session store。
  })
);

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:3000`);
});
