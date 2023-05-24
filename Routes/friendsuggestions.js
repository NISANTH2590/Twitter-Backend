let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");
const { showfriends } = require("../controllers/Friends/FriendSuggestion");

router.get("/friendsuggestions", AuthenticateToken, showfriends);

module.exports = router;
