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
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(
      __dirname,
      "./my-world-map-front/build",
      "index.html"
    )
  );
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

module.exports = app;
