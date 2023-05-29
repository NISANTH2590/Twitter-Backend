const database = require("../../db.config");

const addfollower = async (req, res) => {
  try {
    const user = req.params.id;
    const userid = req.user.user_id;
    await database.query(
      "insert into follow (followerid,followingid) values ($1,$2) ",
      [userid, user],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res.status(200).json({ status: true, message: "Follower Added" });
          else {
            res
              .status(200)
              .json({ status: false, message: "Follower Not Added" });
          }
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = { addfollower };
