const database = require("../../db.config");

const addfollower = async (req, res) => {
  try {
    const user = req.body.userid;
    const userid = req.user.user_id;
    await database.query(
      "insert into follow (followersid,followingid) values ($1,$2) ",
      [userid, user],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("Follower Added");
          else {
            res.status(200).json("Follower Not Added");
          }
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { addfollower };
