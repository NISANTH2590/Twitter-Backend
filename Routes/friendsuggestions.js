let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");
const { showfriends } = require("../controllers/Friends/FriendSuggestion");

router.post("/friendsuggestions", AuthenticateToken, showfriends);

module.exports = router;
