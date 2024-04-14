const express = require("express");
const app = express();
const morgan = require("morgan");
const sequelize = require("./utils/database");


const appuser = require("./models/appuser");
const parkingSpace = require("./models/parkingSpace");
const parkingSlot = require("./models/parkingSlot");
const booking = require("./models/booking");

const authRoute = require("./routes/authenticationRoutes");
const parkingRoute = require("./routes/parkingRoutes");

const bodyParser = require("body-parser");
const session = require("express-session");

//middleware
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: "kFUPc17OzA", // This should be a long, random string
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Aceept"
    ),
    res.header("Access-Control-Allow-Credentials", "true"),
    res.header("Access-Control-Request-Method", "GET,POST,DELETE,PUT,OPTIONS"),
    res.header("Access-Control-Allow-Method", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});

app.use("/authentication", authRoute);
app.use("/parking", parkingRoute);

sequelize.sync();

app.listen(8080, () => {
  console.log("Parking Ticketing System is running on port:", 8080);
});
