let express = require("express");
let app = express();
const ratelimit = require("express-rate-limit");
const limiter = ratelimit({
  max: 2,
  windowMs: 10000,
});
// const io = require("socket.io")(3000);
let cors = require("cors");
require("dotenv").config();
const { PORT } = process.env;
const port = 8080 || PORT;
const auth = require("./Routes/Auth");
const analytics = require("./Routes/TweetAnalytics");
const messages = require("./Routes/Messages");
const list = require("./Routes/Lists");
const profile = require("./Routes/Profile");
const bookmarks = require("./Routes/BookMarks");
const tweets = require("./Routes/Tweets");
const misc = require("./Routes/Misc");
const trending = require("./Routes/Trending");
const follow = require("./Routes/Follow");
const bodyParser = require("body-parser");
const twittercircle = require("./Routes/TwitterCircle");

app.use(
  limiter,
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: false,
  }),
  auth,
  analytics,
  messages,
  list,
  profile,
  bookmarks,
  tweets,
  misc,
  trending,
  follow,
  twittercircle
);

app.listen(port, (err) => {
  if (err) throw err;
  // else console.log("Running at port 8080");
});

// io.on("connection", (socket) => {
//   console.log(socket.id);
// });

// var socket = io();
// // make connection with server from user side
// socket.on("connect", function () {
//   console.log("Connected to Server");
// });
