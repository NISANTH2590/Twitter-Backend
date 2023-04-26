let express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authorization");
const {
  createlist,
  addtweet,
  user_lists,
  addlist,
  deletelist,
} = require("../controllers/lists/lists");

router.post("/createlist", authenticateToken, createlist);
router.post("/user_lists", authenticateToken, user_lists);
router.post("/addtweet", authenticateToken, addtweet);
router.post("/addlist", authenticateToken, addlist);
router.post("/deletelist", authenticateToken, deletelist);

module.exports = router;
