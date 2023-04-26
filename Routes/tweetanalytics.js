let express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authorization");

const {
  impressions,
  Engagements,
  Detail_expands,
  New_followers,
  Profile_visits,
  viewanalytics,
} = require("../controllers/TweetAnalytics/Analytics");

router.patch("/impressions", authenticateToken, impressions);
router.patch("/engagements", authenticateToken, Engagements);
router.patch("/detail_expands", authenticateToken, Detail_expands);
router.patch("/new_followers", authenticateToken, New_followers);
router.patch("/profile_visits", authenticateToken, Profile_visits);
router.patch("/viewanalytics", authenticateToken, viewanalytics);

module.exports = router;
