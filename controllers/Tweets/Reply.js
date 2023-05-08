const database = require("../../db.config");

const showreply = (req, res) => {
  try {
    const tweet = req.body.tweetid;
    if (tweet.id) {
      database.query(
        "select name,username,userid,tweetid,tweetcontent,retweets,replies,views,tweets.createdat,choice1,choice2,choice3,choice4,polllength from UserAccount inner join tweets on UserAccount.id=tweets.userid where tweets.userid=$1 AND tweets.replyid = $2",
        [req.user.user_id, tweet],
        (err, results) => {
          if (err) res.status(400).json({ status: false, message: err });
          if (results.rows.length)
            res.status(200).json({ status: true, data: results.rows });
          else
            res
              .status(200)
              .json({ status: false, message: "No reply tweets available." });
        }
      );
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = { showreply };
