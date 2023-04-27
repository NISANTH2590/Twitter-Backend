let express = require("express");
const router = express.Router();
const { AuthenticateToken } = require("../middleware/Authorization");
const {
  profile,
  // update_profile_pic,
  remove_profile_pic,
  remove_header_pic,
  remove_dob,
  update_profile_content,
  upload,
} = require("../controllers/Profile/UserProfile");

router.post("/uploadprofilepic", AuthenticateToken, upload);
router.get("/profile", AuthenticateToken, profile);
router.patch("/removeprofilepic", AuthenticateToken, remove_profile_pic);
router.patch("/removeheaderpic", AuthenticateToken, remove_header_pic);
router.patch("/removedob", AuthenticateToken, remove_dob);
router.patch("/updateprofile", AuthenticateToken, update_profile_content);

module.exports = router;