let express = require("express");
let router = express.Router();
const { authenticateToken } = require("../middleware/authorization");

const {
  usertweets,
  posttweet,
  deletetweet,
  showtweet,
} = require("../controllers/Tweets/posttweet");
const {
  // likescount,
  likedbyuser,
  likedtweets,
  unlike,
  addlike,
} = require("../controllers/Tweets/likes");
const {
  addretweet,
  retweets,
  undoretweet,
} = require("../controllers/Tweets/retweet");
const {
  addunsenttweet,
  unsenttweets,
  displayunsenttweets,
  deleteunsenttweets,
} = require("../controllers/Tweets/unsenttweets");

const {
  scheduledtweets,
  resetscheduledtweets,
} = require("../controllers/Tweets/scheduledtweets");
// const { route } = require("./messages");

router.get("/usertweets", authenticateToken, usertweets);
router.post("/showtweets", authenticateToken, showtweet);
router.post("/compose/tweet", authenticateToken, posttweet);
router.post("/compose/deletetweet", authenticateToken, deletetweet);

router.post("/addlike", authenticateToken, addlike);
// router.post("/tweetlikes", authenticateToken, likescount);
router.post("/likedusers", authenticateToken, likedbyuser);
router.get("/likedtweets", authenticateToken, likedtweets);
router.post("/unlike", authenticateToken, unlike);

router.post("/addretweet", authenticateToken, addretweet);
router.post("/retweets", authenticateToken, retweets);
router.post("/undoretweet", authenticateToken, undoretweet);

router.post("/addunsenttweet", authenticateToken, addunsenttweet);
router.get("/displayunsenttweets", authenticateToken, displayunsenttweets);
router.post("/unsenttweets", authenticateToken, unsenttweets);
router.post("/deleteunsenttweets", authenticateToken, deleteunsenttweets);

router.get("/scheduledtweets", authenticateToken, scheduledtweets);
router.post("/resetscheduledtweets", authenticateToken, resetscheduledtweets);

module.exports = router;
