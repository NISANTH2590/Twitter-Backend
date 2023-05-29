let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");

const {
  trendinghashtags,
  //   trendinghashtags_music,
  trendinghashtags_entertainment,
  trendinghashtags_sports,
  trendingSection,
  trendinghashtags_news,
} = require("../controllers/WhatsHappeningSection/Trending");

router.post("/trendingHashtags", AuthenticateToken, trendinghashtags);
// router.post(
//   "/trendinghashtags_music",
//   AuthenticateToken,
//   trendinghashtags_music
// );
router.post(
  "/trending/entertainment",
  AuthenticateToken,
  trendinghashtags_entertainment
);
router.post("/trending", AuthenticateToken, trendingSection);
router.post("/trending/sports", AuthenticateToken, trendinghashtags_sports);
router.post("/trending/news", AuthenticateToken, trendinghashtags_news);
module.exports = router;
