const database = require("../../db.config");

const showfriends = (req, res) => {
  try {
    let limit, offset;
    limit = req.body.limit;
    offset = req.body.offset;
    if (!limit) limit = 3;
    if (!offset) offset = 0;
    // offset = limit * offset;
    database.query(
      "SELECT id, name, username, profilepicture_url, bio, verified FROM UserAccount WHERE id!=$1 AND id NOT IN (SELECT followerid FROM follow where followingid = $2 UNION SELECT followingid FROM follow where followerid = $3)limit  $4 offset $5 ",
      [req.user.user_id, req.user.user_id, req.user.user_id, limit, offset],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        if (results.rows.length)
          res.status(200).json({ status: true, data: results.rows });
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = { showfriends };
