let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");
const {
  createlist,
  addtweet,
  user_lists,
  addlist,
  deletelist,
} = require("../controllers/Lists/Lists");

router.post("/createlist", AuthenticateToken, createlist);
router.post("/user_lists", AuthenticateToken, user_lists);
router.post("/addtweet", AuthenticateToken, addtweet);
router.post("/addlist", AuthenticateToken, addlist);
router.delete("/deletelist", AuthenticateToken, deletelist);

module.exports = router;
