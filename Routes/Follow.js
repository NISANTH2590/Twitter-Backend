let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");
const {
  followcount,
  followercount,
  followingcount,
} = require("../controllers/Follow/FollowCount");
const { addfollower } = require("../controllers/Follow/AddFollower");
const { unfollow } = require("../controllers/Follow/UnFollow");

router.get("/followcount", AuthenticateToken, followcount);
router.get("/followercount", AuthenticateToken, followercount);
router.get("/followingcount", AuthenticateToken, followingcount);
router.post("/addfollower", AuthenticateToken, addfollower);
router.delete("/unfollow", AuthenticateToken, unfollow);

module.exports = router;
