const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Todo = require("./models/todo"); // 載入 Todo model

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  //「非正式環境」 (亦指非 Production 正式機)
  require("dotenv").config();
}
const app = express();
const port = 3000;

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

//連線異常
db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("connect success!");
});

//set view template
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" })); //設定副檔名
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((todos) => {
      res.render(`index`, { todos }); // 將資料傳給 index 樣板
    })
    .catch((err) => console.error(err)); // 錯誤處理
});

app.get("/todos/new", (req, res) => {
  res.render("new");
});

app.post("/todos", (req, res) => {
  const name = req.body.name;
  return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect("/")) // 新增完成後導回首頁
    .catch((error) => console.log(error));
});

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:3000`);
});
