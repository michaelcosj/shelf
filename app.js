const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectMongoDB = require("./config/db");
const handlebars = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

// Initialize express
const app = express();

// CookieParser
app.use(cookieParser());

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride("_method"));

// Logging with morgan
app.use(morgan("dev"));

// Handlebars helpers
const { formatDate } = require("./helpers/hbs");

// Handlebars
app.engine(
  ".hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: "views/partials",
    helpers: {
      formatDate,
    },
  })
);
app.set("view engine", ".hbs");

// Load configs
require("dotenv").config({ path: "./config/config.env" });

// Static folders
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);
app.use(express.static(path.join(__dirname, "public")));

// express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

connectMongoDB();

// Routes
app.use("/shelf", require("./routes/shelf"));
app.use("/auth", require("./routes/auth"));
app.use("/book", require("./routes/book"));
app.use("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/shelf");
  }
  res.render("auth");
});

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  if (res.statusCode == 500) {
    res.render("error/500");
  } else if (res.statusCode == 404) {
    res.render("error/404");
  } else if (res.statusCode == 409) {
    res.render("error/409", { message: error.message });
  } else {
    res.send(error);
  }
});

module.exports = app;
