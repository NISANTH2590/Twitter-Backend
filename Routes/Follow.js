let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");
const {
  followcount,
  followercount,
  followingcount,
  followercount_recommended,
  // followercountrename,
} = require("../controllers/Follow/FollowCount");
const { addfollower } = require("../controllers/Follow/AddFollower");
const { unfollow } = require("../controllers/Follow/UnFollow");

router.get("/followcount", AuthenticateToken, followcount);
router.get("/followercount", AuthenticateToken, followercount);
router.get(
  "/followcount/recommended",
  AuthenticateToken,
  followercount_recommended
);
router.get("/followingcount", AuthenticateToken, followingcount);
// router.get("/followercountrename", AuthenticateToken, followercountrename);
router.get("/addFollower/:id", AuthenticateToken, addfollower);
router.delete("/unFollow/:id", AuthenticateToken, unfollow);

module.exports = router;
