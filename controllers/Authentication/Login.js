var database = require("../../db.config");
const express = require("express");
const app = express();
var bcrypt = require("bcrypt");
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const SERVER_ROOT_URI = "http://localhost:8080";
const { forgetotp } = require("../../utils/helpers/otp_generator");
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  NODEMAILER_OWNER_ID,
  NODEMAILER_OWNER_PASS,
  JWT_SECRET_KEY,
  TOKEN_HEADER_KEY,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  UI_ROOT_URI,
  // SERVER_ROOT_URI,
  COOKIE_NAME,
} = process.env;

const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
// let type = "";

// const redirecturl = "/homepage";
// function getGoogleAuthURL() {
//   const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
//   const options = {
//     redirect_uri: `${SERVER_ROOT_URI}${redirecturl}`,
//     client_id: GOOGLE_OAUTH_CLIENT_ID,
//     access_type: "offline",
//     response_type: "code",
//     prompt: "consent",
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ].join(" "),
//   };

//   return `${rootUrl}?${querystring.stringify(options)}`;
// }

var GoogleLogin = (req, res) => {
  try {
    const accesstoken = req.body.accesstoken;
    const email = req.body.email;
    database.query(
      "insert into UserAccount(email,token) values ($1,$2)",
      [email, accesstoken],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          res.status(200).json({ message: "user inserted" });
        }
      }
    );
    // return res.send(getGoogleAuthURL());
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

var UserPassword = async (req, res) => {
  try {
    var password = req.body.password;
    var phone = req.body.phonenumber;
    var email = req.body.email;
    var username = req.body.username;

    if (phone) {
      database.query(
        "SELECT password,id FROM UserAccount WHERE phonenumber=$1",
        [phone],
        async (err, results, fields) => {
          if (err) throw err;
          if (results.rows.length) {
            var a = results.rows[0].password;
            var User_id = results.rows[0].id;
            var allow = await bcrypt.compare(password, a);

            if (allow) {
              const token = jwt.sign({ user_id: User_id }, JWT_SECRET_KEY, {
                expiresIn: "7d",
              });
              database.query(
                "update UserAccount set token = $1 where id = $2",
                [token, User_id],
                async (err, results, fields) => {
                  if (err)
                    res.status(400).json({ status: false, message: err });
                  res.status(200).json({ status: true, data: token });
                }
              );
            } else {
              res
                .status(200)
                .json({ status: false, message: "Wrong Password!" });
            }
          }
        }
      );
    } else if (email) {
      // console.log(email);
      database.query(
        "SELECT password,id FROM UserAccount WHERE email=$1",
        [email],
        async (err, results, fields) => {
          if (err) throw err;
          if (results.rows.length) {
            var a = results.rows[0].password;
            var User_id = results.rows[0].id;
            var allow = await bcrypt.compare(password, a);

            if (allow) {
              const token = jwt.sign({ user_id: User_id }, JWT_SECRET_KEY, {
                expiresIn: "7d",
              });
              database.query(
                "update UserAccount set token = $1 where id = $2",
                [token, User_id],
                async (err, results, fields) => {
                  if (err)
                    res.status(400).json({ status: false, message: err });
                  res.status(200).json({ status: true, data: token });
                }
              );
            } else {
              res
                .status(200)
                .json({ status: false, message: "Wrong Password!" });
            }
          }
        }
      );
    } else if (username) {
      database.query(
        "SELECT password,id FROM UserAccount WHERE username=$1",
        [username],
        async (err, results, fields) => {
          if (err) throw err;
          if (results.rows.length) {
            var a = results.rows[0].password;
            var User_id = results.rows[0].id;
            var allow = await bcrypt.compare(password, a);
            if (allow) {
              const token = jwt.sign({ user_id: User_id }, JWT_SECRET_KEY, {
                expiresIn: "7d",
              });
              database.query(
                "update UserAccount set token = $1 where id = $2",
                [token, User_id],
                async (err, results, fields) => {
                  if (err)
                    res.status(400).json({ status: false, message: err });
                  res.status(200).json({ status: true, data: token });
                }
              );
            } else {
              res
                .status(200)
                .json({ status: false, message: "Wrong Password!" });
            }
          }
        }
      );
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

var PassResetStatus = (req, res) => {
  try {
    var status = req.body.status;
    var phone = req.body.phonenumber;
    var email = req.body.email;
    if (status && phone) {
      database.query(
        "update UserAccount set pass_reset_status = 'true'  where phonenumber = $1;",
        [phone],
        async (err, results) => {
          if (err) res.status(400).json({ status: false, message: err });
          res.status(200).json({ status: true, message: "Success" });
        }
      );
    } else if (status && email) {
      database.query(
        "update UserAccount set pass_reset_status = 'true'  where email = $1;",
        [email],

        async (err, results) => {
          if (err) res.status(400).json({ status: false, message: err });
          res.status(200).json({ status: true, message: "Success" });
        }
      );
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

var LoginOtp = (req, res) => {
  try {
    var phone = req.body.phonenumber;
    var email = req.body.email;
    if (phone) {
      client.messages
        .create({
          body: "Your Twitter confirmation code is " + forgetotp + ".",
          to: "+91" + phone,
          from: "+18572801915",
        })
        .then((message) => res.send("OTP sent"));
    } else if (email) {
      let username;
      database.query(
        "select username from UserAccount where email = $1",
        [email],
        (err, results, fields) => {
          if (results.rows.length > 0) {
            if (err) res.status(400).json({ status: false, message: err });
            else {
              username = results.rows[0].username;
            }
          }
        }
      );
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: NODEMAILER_OWNER_ID,
          pass: NODEMAILER_OWNER_PASS,
        },
      });

      let mailDetails = {
        from: NODEMAILER_OWNER_ID,
        to: email,
        subject: "TEST OTP mail",
        text:
          "Reset your password? If you requested a password reset for @ " +
          username +
          ", use the confirmation code below to complete the process. If you didn't make this request, ignore this email. " +
          forgetotp,
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          res.status(400).json({ status: false, message: err });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Email sent successfully" });
        }
      });
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

var VerifyLoginOtp = (req, res) => {
  try {
    if (req.body.otp == forgetotp) {
      res.status(200).json({ status: true, message: "OTP verified" });
    } else res.status(400).json({ status: false, message: "Invalid OTP" });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

var UpdatePassword = async (req, res) => {
  try {
    var phone = req.body.phone;
    var email = req.body.email;
    var username = req.body.username;
    var newpassword = req.body.newpassword;
    const salt = await bcrypt.genSalt(10);
    newpassword = await bcrypt.hash(newpassword, salt);
    if (phone) {
      database.query(
        "UPDATE UserAccount SET password=$1 WHERE phonenumber=$2",
        [newpassword, phone],
        async (err, results, fields) => {
          if (err) res.status(400).json({ status: false, message: err });
          res.status(200).json({ status: true, message: "Password Changed" });
          res.end();
        }
      );
    } else if (email) {
      database.query(
        "UPDATE UserAccount SET password=$1 WHERE email=$2",
        [newpassword, email],
        async (err, results, fields) => {
          if (err) res.status(400).json({ status: false, message: err });
          res.status(200).json({ status: true, message: "Password Changed" });
          res.end();
        }
      );
    } else if (username) {
      database.query(
        "UPDATE UserAccount SET password=$1 WHERE username=$2",
        [newpassword, username],
        async (err, results, fields) => {
          if (err) res.status(400).json({ status: false, message: err });
          res.status(200).json({ status: true, message: "Password Changed" });
          res.end();
        }
      );
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

var PassResetOpinion = (req, res) => {
  try {
    var pass_reset_opinion = req.body.opinion;
    var username = req.body.username;
    var phone = req.body.phone;
    var email = req.body.email;

    if (phone) {
      database.query(
        "UPDATE UserAccount SET pass_reset_opinion=$1 WHERE phonenumber=$2",
        [pass_reset_opinion, phone],
        async (err, results, fields) => {
          if (err) res.status(400).json({ status: false, message: err });
          res.status(200).json({ status: true, message: "Success" });
          res.end();
        }
      );
    } else if (email) {
      database.query(
        "UPDATE UserAccount SET pass_reset_opinion=$1 WHERE email=$2",
        [pass_reset_opinion, email],
        async (err, results, fields) => {
          if (err) res.status(400).json({ status: false, message: err });
          res.status(200).json({ status: true, message: "Success" });
          res.end();
        }
      );
    } else if (username) {
      database.query(
        "UPDATE UserAccount SET pass_reset_opinion=$1 WHERE username=$2",
        [pass_reset_opinion, username],
        async (err, results, fields) => {
          if (err) res.status(400).json({ status: false, message: err });
          res.status(200).json({ status: true, message: "Success" });
          res.end();
        }
      );
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = {
  GoogleLogin,
  UserPassword,
  LoginOtp,
  VerifyLoginOtp,
  UpdatePassword,
  PassResetStatus,
  PassResetOpinion,
};
