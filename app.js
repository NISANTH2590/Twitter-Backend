let express = require("express");
let app = express();
// const io = require("socket.io")(3000);
let cors = require("cors");
require("dotenv").config();
const { PORT } = process.env;
const port = 8080 || PORT;
const auth = require("./Routes/Auth");
const analytics = require("./Routes/tweetanalytics");
const messages = require("./Routes/messages");
const list = require("./Routes/lists");
const profile = require("./Routes/profile");
const bookmarks = require("./Routes/bookmarks");
const tweets = require("./Routes/tweets");
const misc = require("./Routes/misc");
const trending = require("./Routes/trending");
const bodyParser = require("body-parser");
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(
  auth,
  analytics,
  messages,
  list,
  profile,
  bookmarks,
  tweets,
  misc,
  trending
);

app.listen(port, (err) => {
  if (err) throw err;
  else console.log("Running at port 8080");
});

// io.on("connection", (socket) => {
//   console.log(socket.id);
// });

// var socket = io();
// // make connection with server from user side
// socket.on("connect", function () {
//   console.log("Connected to Server");
// });