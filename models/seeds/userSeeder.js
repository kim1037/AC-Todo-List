const users = [
  {
    name: "Tony",
    email: "tony@stark.com",
    password: "iamironman",
  },
  {
    name: "Steve",
    email: "captain@hotmail.com",
    password: "icandothisallday",
  },
  {
    name: "Peter",
    email: "peter@parker.com",
    password: "enajyram",
  },
  {
    name: "Natasha",
    email: "natasha@gamil.com",
    password: "*parol#@$!",
  },
  {
    name: "Nick",
    email: "nick@shield.com",
    password: "password",
  },
];

const Users = require("../users");
const db = require("../../config/mongoose");

db.once("open", () => {
  console.log("MongoDB connect success!");
  Users.create(users)
    .then(() => console.log("done"))
    .catch((e) => console.log(e));
});
