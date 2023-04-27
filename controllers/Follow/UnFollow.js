const database = require("../../db.config");

const unfollow = async (req, res) => {
  try {
    let user = req.body.userid;

    await database.query(
      "delete from follow where followingid=$1 AND followersid = $2",
      [user, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json(err);
        if (results) res.status(200).json("Follower Removed");
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { unfollow };
