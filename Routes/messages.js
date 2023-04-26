let express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authorization");
const {
  addmessage,
  displaymessages,
  displayusermessages,
} = require("../controllers/messages/messages");

router.post("/addmessage", authenticateToken, addmessage);
// router.post("/displaymessages", authenticateToken, displaymessages);
router.post("/displayusermessages", authenticateToken, displayusermessages);

module.exports = router;
