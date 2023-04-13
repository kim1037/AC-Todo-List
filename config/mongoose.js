const mongoose = require("mongoose");
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  //「非正式環境」 (亦指非 Production 正式機)
  require("dotenv").config();
}

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

//連線異常
db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("MongoDB connect success!");
});

module.exports = db;
