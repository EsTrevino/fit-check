const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const users = require("./routes/api/userRoutes");

app.use(passport.initialize());
require("./config/passport")(passport);
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//mongoose connection
const mongoDB = "mongodb://localhost:27017/fitcheck_DB";
mongoose.connect(mongoDB, () => {
  console.log("MongoDB connected");
  err => console.log(err);
});

app.use("/api/users", users);

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`server running on ${port}`));
