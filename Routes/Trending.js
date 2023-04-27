let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");

const {
  trendinghashtags,
  //   trendinghashtags_music,
  trendinghashtags_entertainment,
  trendinghashtags_sports,
  trendinghashtags_news,
} = require("../controllers/WhatsHappeningSection/Trending");

router.post("/trendinghashtags", AuthenticateToken, trendinghashtags);
// router.post(
//   "/trendinghashtags_music",
//   AuthenticateToken,
//   trendinghashtags_music
// );
router.post(
  "/trendinghashtags_entertainment",
  AuthenticateToken,
  trendinghashtags_entertainment
);
router.post(
  "/trendinghashtags_sports",
  AuthenticateToken,
  trendinghashtags_sports
);
router.post("/trendinghashtags_news", AuthenticateToken, trendinghashtags_news);
module.exports = router;
