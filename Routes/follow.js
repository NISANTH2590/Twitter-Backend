let express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authorization");
const { followcount } = require("../controllers/Follow/followcount");
const { addfollower } = require("../controllers/Follow/addfollower");
const { unfollow } = require("../controllers/Follow/unfollow");

router.get("/followcount", authenticateToken, followcount);
router.post("/addfollower", authenticateToken, addfollower);
router.delete("/unfollow", authenticateToken, unfollow);

module.exports = router;
