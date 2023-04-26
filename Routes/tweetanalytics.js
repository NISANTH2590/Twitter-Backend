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

router.post("/impressions", authenticateToken, impressions);
router.post("/engagements", authenticateToken, Engagements);
router.post("/detail_expands", authenticateToken, Detail_expands);
router.post("/new_followers", authenticateToken, New_followers);
router.post("/profile_visits", authenticateToken, Profile_visits);
router.post("/viewanalytics", authenticateToken, viewanalytics);

module.exports = router;
