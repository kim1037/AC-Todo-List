const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
// 引入路由器時，路徑設定為 /routes 會自動去找目錄下的index檔
const routes = require("./routes");
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

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:3000`);
});
