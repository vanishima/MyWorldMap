let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let authRouter = require("./routes/auth");
let postsRouter = require("./routes/posts");

let app = express();

app.use(logger("dev"));
app.use(express.json()); // parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./my-world-map-front/build")));
app.get("/map", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./my-world-map-front/build/index.html"),
    function (err) {
      if (err) {
        console.log("app.get Error", err);
        res.status(500).send(err);
      }
    }
  );
});
app.get("/login", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./my-world-map-front/build/index.html"),
    function (err) {
      if (err) {
        console.log("app.get Error", err);
        res.status(500).send(err);
      }
    }
  );
});
app.get("/register", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./my-world-map-front/build/index.html"),
    function (err) {
      if (err) {
        console.log("app.get Error", err);
        res.status(500).send(err);
      }
    }
  );
});
app.get("/myphotos", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./my-world-map-front/build/index.html"),
    function (err) {
      if (err) {
        console.log("app.get Error", err);
        res.status(500).send(err);
      }
    }
  );
});
app.get("/myblogs", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./my-world-map-front/build/index.html"),
    function (err) {
      if (err) {
        console.log("app.get Error", err);
        res.status(500).send(err);
      }
    }
  );
});
const routes = ["/map", "login", "register"];
routes.map((route) => {
  app.get(route, function (req, res) {
    res.sendFile(path.join(__dirname, "./my-world-map-front/build/index.html"), function (err) {
      if (err) {
        console.log("app.get Error", err);
        res.status(500).send(err);
      }
    });
  });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

module.exports = app;
