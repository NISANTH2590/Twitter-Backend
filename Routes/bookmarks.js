let express = require("express");
const router = express.Router();
const ratelimit = require("express-rate-limit");
const limiter = ratelimit({
  max: 2,
  windowMs: 10000,
});
const { authenticateToken } = require("../middleware/authorization");
const {
  bookmarks,
  addbookmark,
  removebookmark,
  deleteallbookmarks,
} = require("../controllers/bookmarks/bookmarks");

router.get("/bookmarks", authenticateToken, limiter, bookmarks);
router.post("/addbookmark", authenticateToken, addbookmark);
router.delete("/deletebookmark", authenticateToken, removebookmark);
router.delete("/deleteallbookmarks", authenticateToken, deleteallbookmarks);

module.exports = router;
