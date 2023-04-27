const database = require("../../db.config");

const addtwittercircle = (req, res) => {
  try {
    const friendid = req.body.friendid;
    database.query(
      "select * from twittercircle where user_id = $1 AND friendid = $2",
      [req.user.user_id, friendid],
      (err, results) => {
        if (err) throw err;
        if (results.rows.length) {
          res.status(400).json({ Message: "friendid Already added" });
        } else {
          database.query(
            "Insert into twittercircle (user_id,friendid) values ($1,$2)",
            [req.user.user_id, friendid],
            (err, results) => {
              if (err) res.status(400).json(err);
              else {
                if (results) res.status(200).json("friendid added");
                else res.status(200).json("Error inadding friendid");
              }
            }
          );
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const twittercircle = (req, res) => {
  // let friendid = req.body.userid;
  try {
    database.query(
      "select friendid from twittercircle where user_id = $1",
      [req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json(err);

        if (results) res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const deletetwittercircle = (req, res) => {
  try {
    const friendid = req.body.friendid;
    database.query(
      "delete from twittercircle where user_id=$1 AND friendid=$2",
      [req.user.user_id, friendid],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("Friend id deleted");
          else res.status(200).json("Error in deleting a friendid");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = { addtwittercircle, twittercircle, deletetwittercircle };
