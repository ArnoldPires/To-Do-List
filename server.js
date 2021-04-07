const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const TodoList = require("./public/js/main");
const { response } = require('express');
dotenv.config()

//Conect to MongoDB
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () => {
  console.log("Connected to db!");
  app.listen(8000, () => console.log("Server Up and running"));
});

//Use ejs
app.use("/static", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static("public"))

//Get
app.get('/',(request, response) => {
  TodoList.find({}, (err, list) => {
    response.render("index.ejs", { todoList: list})
  })
})

//Post
app.post("/", async (request, response) => {
  const todoList = new todoList({
    content: request.body.content
  })
  try {
    await todoList.save()
    response.redirect("/")
  } catch (err) {
    response.redirect("/")
  }
})
