const database = require("../../db.config");

try {
  var usercredentials = (req, res) => {
    var user = req.body.user;
    // console.log(user);
    let query = "";
    if (/^[0-9]{10}$/.test(user)) {
      query = "SELECT phonenumber FROM UserAccount WHERE phonenumber = $1";
      // type = "phonenumber";
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user)) {
      query = "SELECT email FROM UserAccount WHERE email = $1";
      // type = "email";
    } else if (/^[A-Za-z0-9]*$/.test(user)) {
      query = "SELECT username FROM UserAccount WHERE username = $1";
      // type = "username";
    } else {
      res.status(400).json({ message: "Invalid input." });
      return;
    }

    database.query(query, [user], (err, result) => {
      if (err) {
        res.status(500).json({ message: "Database error." });
      } else if (result.rows.length === 0) {
        res.status(200).json("Invalid credentials");
      } else {
        // console.log();
        res.status(200).json(result.fields[0].name);
      }
    });
  };
} catch (err) {
  res.status(400).json(err);
}

try {
  var checkemail = (req, res) => {
    let email = req.body.email_id;
    // console.log(email);
    if (email) {
      database.query(
        "select * from UserAccount where email = $1",
        [email],
        (err, results, fields) => {
          if (err) {
            res.status(400).json(err);
          } else {
            if (results.rows.length > 0) {
              res.status(200).json("Email is Already Taken");
            } else {
              res.status(200).json("Success");
            }
          }
        }
      );
    }
  };
} catch (err) {
  res.status(400).json(err);
}

try {
  var checkphone = (req, res) => {
    let phone = req.body.phone_number;
    // console.log(phone);
    if (phone) {
      database.query(
        "select * from UserAccount where phonenumber = $1",
        [phone],
        (err, results) => {
          if (err) res.status(400).json(err);
          else if (results.rows.length > 0) {
            res.status(200).json("Phone Number is Already Taken");
          } else {
            res.status(200).json("Success");
          }
        }
      );
    }
  };
} catch (err) {
  res.status(400).json(err);
}

try {
  var checkusername = (req, res) => {
    let userName = req.body.username;
    // console.log(userName);
    if (userName) {
      database.query(
        "select username from UserAccount where username = $1",
        [userName],
        (err, results, fields) => {
          if (err) res.status(400).json(err);
          else {
            if (results.rows.length > 0) {
              res.status(200).json("username is Already Taken");
            } else {
              // console.log("n");
              res.status(200).json("success");
            }
          }
        }
      );
    }
  };
} catch (err) {
  res.status(400).json(err);
}

module.exports = { checkemail, checkphone, checkusername, usercredentials };
