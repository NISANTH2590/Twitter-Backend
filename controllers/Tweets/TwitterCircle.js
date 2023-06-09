const database = require("../../db.config");

const addtwittercircle = (req, res) => {
  try {
    const friendid = req.body.friendid;
    // console.log(friendid);
    if (friendid) {
      database.query(
        "select * from twittercircle where user_id = $1 AND friendid = $2",
        [req.user.user_id, friendid],
        (err, results) => {
          if (err) res.status(400).json({ status: false, message: err });
          if (results.rows.length) {
            res.status(200).json({ Message: "friendid Already added" });
          } else {
            database.query(
              "Insert into twittercircle (user_id,friendid) values ($1,$2)",
              [req.user.user_id, friendid],
              (err, results) => {
                if (err) res.status(400).json({ status: false, message: err });
                else {
                  if (results)
                    res
                      .status(200)
                      .json({ status: true, message: "friendid added" });
                  else
                    res.status(200).json({
                      status: false,
                      message: "Error inadding friendid",
                    });
                }
              }
            );
          }
        }
      );
    } else {
      res.status(200).json({ status: false, message: "Invalid friendId" });
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const twittercircle = (req, res) => {
  try {
    database.query(
      "select name,id,username,profilepicture_url,bio,verified,friendid from twittercircle inner join UserAccount on id = friendid where user_id = $1",
      [req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });

        if (results)
          res.status(200).json({ status: true, twittercircle: results.rows });
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const deletetwittercircle = (req, res) => {
  try {
    const friendid = req.params.id;
    // console.log(friendid);
    if (friendid) {
      database.query(
        "delete from twittercircle where user_id=$1 AND friendid=$2",
        [req.user.user_id, friendid],
        (err, results) => {
          if (err) res.status(400).json({ status: false, message: err });
          else {
            if (results)
              res
                .status(200)
                .json({ status: true, message: "Friend id deleted" });
          }
        }
      );
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};
module.exports = { addtwittercircle, twittercircle, deletetwittercircle };
