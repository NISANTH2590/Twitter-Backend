let bcrypt = require("bcrypt");
let database = require("../../db.config");
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { otp, usernameotp } = require("../../utils/helpers/otp_generator");
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  NODEMAILER_OWNER_ID,
  NODEMAILER_OWNER_PASS,
  JWT_SECRET_KEY,
} = process.env;

// console.log(JWT_SECRET_KEY);
const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// "phone":"8533476534",
// "pass":"nish@123",
// "name":"nishnath",
// "birthdate":"15-02-2000",
// "exp":"true",
// "profilepicurl":"www.google.com",
// "username":"nish2"

try {
  var otpAuth = (req, res) => {
    var phone = req.body.phonenumber;
    var email = req.body.email;
    // console.log(phone);
    // console.log(email);
    if (phone) {
      // console.log("hi");
      client.messages
        .create({
          body: "Your Twitter confirmation code is " + otp + ".",
          to: "+91" + phone,
          from: "+18572801915",
        })
        .then((message) => res.status(200).json(otp))
        .catch((err) => res.status(400).json(err));
    } else if (email) {
      // console.log("hi");
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
        text: "Here is your otp : " + otp,
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(otp);
        }
      });
    }
  };
} catch (err) {
  res.status(400).json(err);
}

try {
  var verifyotp = (req, res) => {
    var phone = req.body.phone;
    var email = req.body.email;
    var name = req.body.name;
    var birthdate = req.body.dateofbirth;
    var exp = req.body.experience;
    var OTP = req.body.otp;
    var User_id;

    // console.log(name, email, birthdate, phone, exp);
    if (OTP == otp) {
      // console.log("ihj");
      database.query(
        "insert into UserAccount(name,email,birthdate,phonenumber,experience,createdat) values ($1,$2,$3,$4,$5,NOW())",
        [name, email, birthdate, phone, exp],
        (err, results) => {
          if (err) res.status(400).json(err);
        }
      );
      if (email) {
        database.query(
          "select id from UserAccount where email = $1",
          [email],
          (err, results) => {
            if (err) throw err;
            if (results.rows.length) {
              User_id = results.rows[0].id;
              const token = jwt.sign({ user_id: User_id }, JWT_SECRET_KEY, {
                expiresIn: "10d",
              });
              // const refreshToken = jwt.sign(user, config.refreshTokenSecret, {
              //   expiresIn: config.refreshTokenLife,
              // });

              database.query(
                "update UserAccount set token =$1 where email = $2",
                [token, email],
                (err, results) => {
                  if (err) res.status(400).json(err);
                  else res.status(200).json(token);
                }
              );
            }
          }
        );
      } else if (phone) {
        database.query(
          "select id from UserAccount where phonenumber = $1",
          [phone],
          (err, results) => {
            if (err) throw err;
            if (results.rows.length) {
              User_id = results.rows[0].id;
              const token = jwt.sign({ user_id: User_id }, JWT_SECRET_KEY, {
                expiresIn: "10d",
              });

              // const refreshToken = jwt.sign(user, config.refreshTokenSecret, {
              //   expiresIn: config.refreshTokenLife,
              // });

              database.query(
                "update UserAccount set token =$1 where phonenumber = $2",
                [token, phone],
                (err, results) => {
                  if (err) res.status(400).json(err);
                  else res.status(200).json(token);
                }
              );
            }
          }
        );
      }
    } else res.status(200).json("Invalid OTP");
  };
} catch (err) {
  res.status(400).json(err);
}

try {
  var password = async (req, res) => {
    var pass = req.body.password;
    // console.log(pass);
    const salt = await bcrypt.genSalt(10);
    pass = await bcrypt.hash(pass, salt);
    database.query(
      "update UserAccount set password=$1 where id = $2",
      [pass, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          res.status(200).json("Password Inserted");
        }
      }
    );
  };
} catch (err) {
  res.status(400).json(err);
}

try {
  var username = async (req, res) => {
    var name;
    database.query(
      "select name from UserAccount where id = $1",
      [req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json(err);
        if (results.rows.length) name = results.rows[0].name;
        res.status(200).json(name + usernameotp);
      }
    );
  };
} catch (err) {
  res.status(400).json(err);
}

try {
  var insertusername = async (req, res) => {
    var username = req.body.username;
    // console.log(username);
    if (username) {
      database.query(
        "update UserAccount set username=$1 where id = $2",
        [username, req.user.user_id],
        (err, results) => {
          if (err) res.status(400).json(err);
          res.status(200).json("user name inserted");
        }
      );
    }
  };
} catch (err) {
  res.status(400).json(err);
}

try {
  var notification_permission = async (req, res) => {
    var notification = req.body.notification;
    database.query(
      "update UserAccount set notification_permission=$1 where id = $2",
      [notification, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json(err);
        res.status(200).json("notification inserted");
      }
    );
  };
} catch (err) {
  res.status(400).json(err);
}

module.exports = {
  otpAuth,
  verifyotp,
  password,
  username,
  insertusername,
  notification_permission,
};