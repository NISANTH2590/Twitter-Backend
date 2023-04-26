let express = require("express");
let router = express.Router();
const {
  otpAuth,
  verifyotp,
  password,
  username,
  insertusername,
  notification_permission,
} = require("../controllers/Authentication/signup");

const {
  usercredentials,
  checkemail,
  checkphone,
  checkusername,
} = require("../controllers/Authentication/checkcredentials");

const {
  googlelogin,
  userpassword,
  loginotp,
  verifyloginotp,
  updatepassword,
  pass_reset_status,
  pass_reset_opinion,
} = require("../controllers/Authentication/login");

const { authenticateToken } = require("../middleware/authorization");

const {
  displaylanguages,
  registerlanguages,
  userlanguages,
} = require("../controllers/Languages/languages");

router.post("/checkphone", checkphone);
router.post("/checkemail", checkemail);
router.post("/otp", otpAuth);
router.post("/verifyotp", verifyotp);
router.post("/password", authenticateToken, password);
// router.post("/updateprofilepic", authenticateToken, update_profile_pic);
router.get("/username", authenticateToken, username);
router.post("/checkusername", authenticateToken, checkusername);
router.post(
  "/notification_permission",
  authenticateToken,
  notification_permission
);
router.post("/insertusername", authenticateToken, insertusername);

router.get("/displaylanguages", authenticateToken, displaylanguages);
router.get("/userlanguages", authenticateToken, userlanguages);
router.post("/registerlanguages", authenticateToken, registerlanguages);

router.post("/usercredentials", usercredentials);
router.post("/login", userpassword);
router.get("/googlelogin", googlelogin);
router.post("/passresetstatus", pass_reset_status);
// router.post("/loginotp", loginotp);
// router.post("/verifyloginotp", verifyloginotp);
router.post("/updatepassword", updatepassword);
router.post("/passwordresetopinion", pass_reset_opinion);
// router.get("/homepage", authenticateToken, welcomepage);
// router.post("/welcomepage", welcomepage);
// router.post("/loginpage", loginpage);

module.exports = router;
