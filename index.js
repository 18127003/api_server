const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const app = express();
const db = require("./config/key").mongoURI;
const { EventEmitter } = require("events");
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
let allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
}
app.use(allowCrossDomain);
app.use("/", require("./route/api.js"));
const PORT = process.env.PORT || 5500;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
