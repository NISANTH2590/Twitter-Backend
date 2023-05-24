const database = require("../../db.config");

const addActivity = (req, res) => {
  try {
    let activity = req.body.activity;
    let tweetid = req.body.tweetid;
    let friendid = req.body.friendid;
    database.query(
      "insert into notification (activity,tweetid,friendid) values ($1,$2,$3) where userid = $4;",
      [activity, tweetid, friendid, req.user.user_id],
      (err, results) => {
        res.status(200).json({ status: true, data: results.rows });
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

// const mentionedActivities = (req, res) => {
//   const parentUsername = req.body.username;
//   try {
//     database.query(
//       "select * from mentions where username = $1;",
//       [parentUsername],
//       (err, results) => {
//         database.query(
//           "select * from mentions where username = $1;",
//           [parentUsername],
//           (err, results) => {
//         res.status(200).json({ status: true, data: results.rows });\
//           }
//       }
//     );
//   } catch (err) {
//     res.status(400).json({ status: false, message: err });
//   }
// };

const Notification = (req, res) => {
  try {
    database.query(
      "select friendid,id,name,username,profilepicture_url,verified from notification inner join useraccount on useraccount.id = notification.userid where friendid = $1;",
      [req.user.user_id],
      (err, results) => {
        res.status(200).json({ status: true, data: results.rows });
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

// const likeNotification = (req, res) => {
//   try {
//     database.query(
//       "select friendid,activity,id,name,username,profilepicture_url,verified from notification inner join useraccount on useraccount.id = notification.friendid where userid = $1;",
//       [req.user.user_id],
//       (err, results) => {
//         res.status(200).json({ status: true, data: results.rows });
//       }
//     );
//   } catch (err) {
//     res.status(400).json({ status: false, message: err });
//   }
// };

module.exports = {
  addActivity,
  // mentionedActivities,
  Notification,
};
