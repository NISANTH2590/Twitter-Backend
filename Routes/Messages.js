let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");
const {
  addmessage,
  displaymessages,
  displayusermessages,
} = require("../controllers/Messages/Messages");

router.post("/addmessage", AuthenticateToken, addmessage);
// router.post("/displaymessages", AuthenticateToken, displaymessages);
router.post("/displayusermessages", AuthenticateToken, displayusermessages);

module.exports = router;
