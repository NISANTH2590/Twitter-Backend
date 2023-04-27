let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");
const { followcount } = require("../controllers/Follow/FollowCount");
const { addfollower } = require("../controllers/Follow/AddFollower");
const { unfollow } = require("../controllers/Follow/UnFollow");

router.get("/followcount", AuthenticateToken, followcount);
router.post("/addfollower", AuthenticateToken, addfollower);
router.delete("/unfollow", AuthenticateToken, unfollow);

module.exports = router;
