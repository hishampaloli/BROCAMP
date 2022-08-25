const express = require("express");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require('bcrypt');

const User = require("./user");

const app = express();

mongoose.connect("mongodb://localhost:27017/userSession", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views","views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

app.get("/", sessionChecker, (req, res) => {
  res.redirect("login");
});

app
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    const user = await User.findOne({
      name: req.body.name
    });

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (valid) {
      req.session.user = user;
      res.redirect("/dashboard");
    } else {
      res.redirect("/login");
    }
  });

app
  .route("/signup")
  .get(sessionChecker, (req, res) => {
    res.render("signup");
  })
  .post(async (req, res) => {
    const hash = await bcrypt.hash(req.body.bod.password, 10);

    const user = new User({
      name: req.body.bod.name,
      email: req.body.bod.email,
      password: hash,
    });

    const userExist = await User.findOne({
      $or: [{ name: req.body.bod.name }, { email: req.body.bod.email }],
    });

    if (!userExist) {
      await user.save((err, doc) => {
        if (err) {
          res.redirect("/signup");
        } else {
          console.log(doc);
          req.session.user = doc;
          res.redirect("/dashboard");
        }
      });
    } else {
      res.redirect("/signup");
    }
  });

app.get("/dashboard", (req, res) => {
  // console.log(req.session.user?.name,"**************");
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    res.render("dashboard", { name: req.session.user.name });
  }
});

app.get("/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("786 ready to go");
});
