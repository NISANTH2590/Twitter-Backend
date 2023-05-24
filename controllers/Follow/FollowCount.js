const database = require("../../db.config");

const followcount = async (req, res) => {
  try {
    Promise.all([
      database.query("select followingid from follow where followerid = $1", [
        req.user.user_id,
      ]),
      database.query("select followerid from follow where followingid = $1", [
        req.user.user_id,
      ]),
    ]).then(
      function ([following, followers]) {
        res.status(200).json({
          status: true,
          following: following.rows.length,
          followers: followers.rows.length,
        });
      },
      function (error) {
        res.status(400).json({ status: false, message: error });
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const followercount_recommended = async (req, res) => {
  try {
    database.query(
      "select name,username,profilepicture_url,bio,verified,id from useraccount where id in (select followerid from follow where followingid = $1 AND followerid not in (select friendid from twittercircle where user_id=$2));",
      [req.user.user_id, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          res.status(200).json({
            status: true,
            followers: results.rows,
          });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const followingcount = async (req, res) => {
  try {
    database.query(
      "select name,username,profilepicture_url,bio,id,verified from UserAccount inner join follow on followingid = id where followerid = $1",
      [req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          res.status(200).json({
            status: true,
            following: results.rows,
          });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const followercount = async (req, res) => {
  try {
    database.query(
      "select name,username,profilepicture_url,bio,id,verified from UserAccount inner join follow on followerid = id where followingid = $1",
      [req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          res.status(200).json({
            status: true,
            follower: results.rows,
          });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = {
  followcount,
  followercount,
  followingcount,
  followercount_recommended,
  // followercountrename,
};
