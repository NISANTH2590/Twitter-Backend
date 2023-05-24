let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");

const { views } = require("../controllers/Tweets/Views");
const {
  addActivity,
  // mentionedActivities,
  Notification,
  // likeNotification,
} = require("../controllers/Notifications/activity");
const {
  add_vote_choice1,
  add_vote_choice2,
  add_vote_choice3,
  add_vote_choice4,
} = require("../controllers/Tweets/Poll");
// const { hashtags } = require("../controllers/Tweets/hashtags");
const {
  search,
  post,
  // deletetweet,
} = require("../controllers/Search/ElasticSearch");

const { showreply } = require("../controllers/Tweets/Reply");

const {
  addnotinterested,
  removenotinterested,
} = require("../controllers/NotInterestedTopics/NotInterested");

router.patch("/addview", AuthenticateToken, views);

router.post("/addActivity", AuthenticateToken, addActivity);
// router.get("/mentionedactivities", AuthenticateToken, mentionedActivities);
router.get("/Notification", AuthenticateToken, Notification);
// router.get("/likeNotification", AuthenticateToken, likeNotification);

router.post("/addnotinterested", AuthenticateToken, addnotinterested);
router.delete("/removenotinterested", AuthenticateToken, removenotinterested);

router.post("/showreply", AuthenticateToken, showreply);

router.patch("/choice1_vote", AuthenticateToken, add_vote_choice1);
router.patch("/choice2_vote", AuthenticateToken, add_vote_choice2);
router.patch("/choice3_vote", AuthenticateToken, add_vote_choice3);
router.patch("/choice4_vote", AuthenticateToken, add_vote_choice4);

// router.get("/notifications", AuthenticateToken, mentionedactivities);

router.post("/search", AuthenticateToken, search);
router.post("/post", AuthenticateToken, post);
// router.delete("/deletetweet/:id", AuthenticateToken, deletetweet);

module.exports = router;
