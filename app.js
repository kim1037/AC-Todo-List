const express = require("express");
const mongoose = require("mongoose");

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

app.get("/", (req, res) => {
  res.send(`Express server test.`);
});

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:3000`);
});
