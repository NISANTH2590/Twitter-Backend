let express = require("express");
let router = express.Router();
const {
  otpAuth,
  verifyotp,
  password,
  username,
  insertusername,
  notification_permission,
} = require("../controllers/Authentication/Signup");

const {
  UserCredentials,
  CheckEmail,
  CheckPhone,
  CheckUsername,
} = require("../controllers/Authentication/CheckCredentials");

const {
  GoogleLogin,
  UserPassword,
  LoginOtp,
  // verifyLoginOtp,
  UpdatePassword,
  PassResetStatus,
  PassResetOpinion,
} = require("../controllers/Authentication/Login");

const { AuthenticateToken } = require("../middleware/Authorization");

const {
  DisplayLanguages,
  RegisterLanguages,
  UserLanguages,
} = require("../controllers/Languages/Languages");

router.post("/CheckPhone", CheckPhone);
router.post("/CheckEmail", CheckEmail);
router.post("/otp", otpAuth);
router.post("/verifyotp", verifyotp);
router.post("/password", AuthenticateToken, password);
// router.post("/updateprofilepic", AuthenticateToken, update_profile_pic);
router.get("/username", AuthenticateToken, username);
router.post("/CheckUsername", AuthenticateToken, CheckUsername);
router.post(
  "/notification_permission",
  AuthenticateToken,
  notification_permission
);
router.post("/insertusername", AuthenticateToken, insertusername);

router.get("/displaylanguages", AuthenticateToken, DisplayLanguages);
router.get("/userlanguages", AuthenticateToken, UserLanguages);
router.post("/registerlanguages", AuthenticateToken, RegisterLanguages);

router.post("/usercredentials", UserCredentials);
router.post("/login", UserPassword);
router.get("/GoogleLogin", GoogleLogin);
router.post("/passresetstatus", PassResetStatus);
// router.post("/loginotp", loginotp);
// router.post("/verifyloginotp", verifyloginotp);
router.post("/updatepassword", UpdatePassword);
router.post("/passwordresetopinion", PassResetOpinion);
// router.get("/homepage", AuthenticateToken, welcomepage);
// router.post("/welcomepage", welcomepage);
// router.post("/loginpage", loginpage);

module.exports = router;
