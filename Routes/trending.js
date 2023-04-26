let express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authorization");

const {
  trendinghashtags,
  //   trendinghashtags_music,
  trendinghashtags_entertainment,
  trendinghashtags_sports,
  trendinghashtags_news,
} = require("../controllers/What's_Happening/trending");

router.post("/trendinghashtags", authenticateToken, trendinghashtags);
// router.post(
//   "/trendinghashtags_music",
//   authenticateToken,
//   trendinghashtags_music
// );
router.post(
  "/trendinghashtags_entertainment",
  authenticateToken,
  trendinghashtags_entertainment
);
router.post(
  "/trendinghashtags_sports",
  authenticateToken,
  trendinghashtags_sports
);
router.post("/trendinghashtags_news", authenticateToken, trendinghashtags_news);
module.exports = router;
