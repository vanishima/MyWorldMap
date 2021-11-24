let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let cors = require("cors");

let indexRouter = require("./routes/index");
let authRouter = require("./routes/auth");
let postsRouter = require("./routes/posts");

let app = express();

app.use(logger("dev"));
app.use(express.json()); // parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./my-world-map-front/build")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.use(cors());

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "./my-world-map-front/build", "index.html")
    );
  });
}

app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./my-world-map-front/build", "index.html")
  );
});
// "heroku-postbuild": "YARN_PRODUCTION=false yarn install --prefix my-world-map-front && yarn run build --prefix my-world-map-front"
module.exports = app;
