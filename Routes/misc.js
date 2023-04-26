let express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authorization");

const { followcount } = require("../controllers/Follow/followcount");
const { addfollower } = require("../controllers/Follow/addfollower");
const { unfollow } = require("../controllers/Follow/unfollow");

const { views } = require("../controllers/Tweets/views");

const {
  add_vote_choice1,
  add_vote_choice2,
  add_vote_choice3,
  add_vote_choice4,
} = require("../controllers/Tweets/poll");
// const { hashtags } = require("../controllers/Tweets/hashtags");
const {
  search,
  post,
  // deletetweet,
} = require("../controllers/search/elastic_search");

const { showreply } = require("../controllers/Tweets/reply");

const {
  addnotinterested,
  removenotinterested,
} = require("../controllers/Not-interested/notinterested");

const { showfriends } = require("../controllers/Friends/friendssuggestion");

const {
  twittercircle,
  addtwittercircle,
  deletetwittercircle,
} = require("../controllers/Tweets/twittercircle");
// const {
//   mentionedactivities,
// } = require("../advance_concepts/Notifications/activity");

router.get("/twittercircle", authenticateToken, twittercircle);
router.post("/addtwittercircle", authenticateToken, addtwittercircle);
router.post("/deletetwittercircle", authenticateToken, deletetwittercircle);

router.get("/followcount", authenticateToken, followcount);
router.post("/addfollower", authenticateToken, addfollower);
router.post("/unfollow", authenticateToken, unfollow);

router.post("/addview", authenticateToken, views);

router.post("/addnotinterested", authenticateToken, addnotinterested);
router.post("/removenotinterested", authenticateToken, removenotinterested);

router.get("/friendsuggestions", authenticateToken, showfriends);

router.post("/showreply", authenticateToken, showreply);

// this is sample test hashtag function I have implemented prisma orm here !!!!!!!!!!!!
// router.post("/hashtags", authenticateToken, hashtags); // this is sample test hashtag function
// this is sample test hashtag function

router.post("/choice1_vote", authenticateToken, add_vote_choice1);
router.post("/choice2_vote", authenticateToken, add_vote_choice2);
router.post("/choice3_vote", authenticateToken, add_vote_choice3);
router.post("/choice4_vote", authenticateToken, add_vote_choice4);

// router.get("/notifications", authenticateToken, mentionedactivities);

router.post("/search", authenticateToken, search);
router.post("/post", authenticateToken, post);
// router.delete("/deletetweet/:id", authenticateToken, deletetweet);

module.exports = router;
