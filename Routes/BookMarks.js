let express = require("express");
const router = express.Router();

const ratelimit = require("express-rate-limit");
const limiter = ratelimit({
  max: 2,
  windowMs: 10000,
});

const { AuthenticateToken } = require("../middleware/Authorization");
const {
  bookmarks,
  addbookmark,
  removebookmark,
  deleteallbookmarks,
} = require("../controllers/BookMarks/Bookmarks");

router.get("/bookmarks", AuthenticateToken, bookmarks);
router.post("/addbookmark", AuthenticateToken, addbookmark);
router.delete("/deletebookmark", AuthenticateToken, removebookmark);
router.delete("/deleteallbookmarks", AuthenticateToken, deleteallbookmarks);

module.exports = router;
