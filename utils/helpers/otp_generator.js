const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const otp = otpGenerator.generate(6, {
  upperCaseAlphabets: false,
  specialChars: false,
  lowerCaseAlphabets: false,
});

const forgetotp = otpGenerator.generate(8, {
  lowerCaseAlphabets: true,
  upperCaseAlphabets: false,
  specialChars: false,
});

const usernameotp = otpGenerator.generate(8, {
  lowerCaseAlphabets: false,
  upperCaseAlphabets: false,
  specialChars: false,
});

const secret = "This_is_the_secret_key_made_by_Nisanth";
const hash = crypto.createHmac("sha256", secret).digest("hex");
// console.log(hash);

module.exports = { otp, forgetotp, usernameotp };
