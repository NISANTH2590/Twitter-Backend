let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");
const {
  twittercircle,
  addtwittercircle,
  deletetwittercircle,
} = require("../controllers/Tweets/TwitterCircle");

router.get("/twittercircle", AuthenticateToken, twittercircle);
router.post("/addtwittercircle", AuthenticateToken, addtwittercircle);
router.delete(
  "/deletetwittercircle/:id",
  AuthenticateToken,
  deletetwittercircle
);

module.exports = router;
