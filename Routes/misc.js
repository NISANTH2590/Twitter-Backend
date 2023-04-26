let express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authorization");

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
// const {
//   mentionedactivities,
// } = require("../advance_concepts/Notifications/activity");
router.patch("/addview", authenticateToken, views);

router.post("/addnotinterested", authenticateToken, addnotinterested);
router.delete("/removenotinterested", authenticateToken, removenotinterested);

router.get("/friendsuggestions", authenticateToken, showfriends);

router.post("/showreply", authenticateToken, showreply);

// this is sample test hashtag function I have implemented prisma orm here !!!!!!!!!!!!
// router.post("/hashtags", authenticateToken, hashtags); // this is sample test hashtag function
// this is sample test hashtag function

router.patch("/choice1_vote", authenticateToken, add_vote_choice1);
router.patch("/choice2_vote", authenticateToken, add_vote_choice2);
router.patch("/choice3_vote", authenticateToken, add_vote_choice3);
router.patch("/choice4_vote", authenticateToken, add_vote_choice4);

// router.get("/notifications", authenticateToken, mentionedactivities);

router.post("/search", authenticateToken, search);
router.post("/post", authenticateToken, post);
// router.delete("/deletetweet/:id", authenticateToken, deletetweet);

module.exports = router;
