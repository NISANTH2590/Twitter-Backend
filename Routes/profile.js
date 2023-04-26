let express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authorization");
const {
  profile,
  // update_profile_pic,
  remove_profile_pic,
  remove_header_pic,
  remove_dob,
  update_profile_content,
  upload,
} = require("../controllers/profile/user_profile");

router.post("/uploadprofilepic", authenticateToken, upload);
router.get("/profile", authenticateToken, profile);
router.get("/removeprofilepic", authenticateToken, remove_profile_pic);
router.get("/removeheaderpic", authenticateToken, remove_header_pic);
router.get("/removedob", authenticateToken, remove_dob);
router.get("/updateprofile", authenticateToken, update_profile_content);

module.exports = router;
