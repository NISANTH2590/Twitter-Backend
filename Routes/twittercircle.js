let express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authorization");
const {
  twittercircle,
  addtwittercircle,
  deletetwittercircle,
} = require("../controllers/Tweets/twittercircle");

router.get("/twittercircle", authenticateToken, twittercircle);
router.post("/addtwittercircle", authenticateToken, addtwittercircle);
router.delete("/deletetwittercircle", authenticateToken, deletetwittercircle);

module.exports = router;
