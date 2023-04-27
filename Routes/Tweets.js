let express = require("express");
let router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");

const {
  usertweets,
  posttweet,
  deletetweet,
  showtweet,
} = require("../controllers/Tweets/PostTweet");
const {
  // likescount,
  likedbyuser,
  likedtweets,
  unlike,
  addlike,
} = require("../controllers/Tweets/Likes");
const {
  addretweet,
  retweets,
  undoretweet,
} = require("../controllers/Tweets/Retweet");
const {
  addunsenttweet,
  unsenttweets,
  displayunsenttweets,
  deleteunsenttweets,
} = require("../controllers/Tweets/UnSentTweets");

const {
  scheduledtweets,
  resetscheduledtweets,
} = require("../controllers/Tweets/ScheduledTweets");
// const { route } = require("./messages");

router.get("/usertweets", AuthenticateToken, usertweets);
router.post("/showtweets", AuthenticateToken, showtweet);
router.post("/compose/tweet", AuthenticateToken, posttweet);
router.delete("/deletetweet", AuthenticateToken, deletetweet);

router.post("/addlike", AuthenticateToken, addlike);
// router.post("/tweetlikes", AuthenticateToken, likescount);
router.post("/likedusers", AuthenticateToken, likedbyuser);
router.get("/likedtweets", AuthenticateToken, likedtweets);
router.delete("/unlike", AuthenticateToken, unlike);

router.post("/addretweet", AuthenticateToken, addretweet);
router.post("/retweets", AuthenticateToken, retweets);
router.delete("/undoretweet", AuthenticateToken, undoretweet);

router.post("/addunsenttweet", AuthenticateToken, addunsenttweet);
router.get("/displayunsenttweets", AuthenticateToken, displayunsenttweets);
router.post("/unsenttweets", AuthenticateToken, unsenttweets);
router.delete("/deleteunsenttweets", AuthenticateToken, deleteunsenttweets);

router.get("/scheduledtweets", AuthenticateToken, scheduledtweets);
router.post("/resetscheduledtweets", AuthenticateToken, resetscheduledtweets);

module.exports = router;
