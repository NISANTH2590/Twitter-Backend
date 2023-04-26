const database = require("../../db.config");

const scheduledtweets = (req, res) => {
  try {
    database.query(
      "select * from tweets where userid = $1 AND schedule IS not null",
      [req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results.rows.length) {
            res.status(200).json(results.rows);
          } else {
            res.status(200).json({ Message: "scheduled Tweets not available" });
          }
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const resetscheduledtweets = (req, res) => {
  try {
    const tweet = req.body.tweetid;
    database.query(
      "update tweets set schedule = $1 where userid = $2 AND tweetid = $3",
      [null, req.user.user_id, tweet],
      (err, results) => {
        if (err) res.status(400).json(err);
        res.status(200).json({ Message: "scheduled Tweets updated" });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { scheduledtweets, resetscheduledtweets };
