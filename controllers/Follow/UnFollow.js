const database = require("../../db.config");

const unfollow = async (req, res) => {
  try {
    let user = req.params.id;

    await database.query(
      "delete from follow where followingid=$1 AND followerid = $2",
      [user, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        if (results)
          res.status(200).json({ status: true, message: "Follower Removed" });
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = { unfollow };
