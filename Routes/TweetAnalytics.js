let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");

const {
  impressions,
  Engagements,
  Detail_expands,
  New_followers,
  Profile_visits,
  viewanalytics,
} = require("../controllers/TweetAnalytics/Analytics");

router.patch("/impressions", AuthenticateToken, impressions);
router.patch("/engagements", AuthenticateToken, Engagements);
router.patch("/detail_expands", AuthenticateToken, Detail_expands);
router.patch("/new_followers", AuthenticateToken, New_followers);
router.patch("/profile_visits", AuthenticateToken, Profile_visits);
router.patch("/viewanalytics", AuthenticateToken, viewanalytics);

module.exports = router;
