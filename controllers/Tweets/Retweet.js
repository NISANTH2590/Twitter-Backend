const database = require("../../db.config");

function updateretweets(tweet) {
  try {
    let retweets = 0;
    database.query(
      "select user_id from retweet where tweet_id = $1",
      [tweet],
      (err, results) => {
        if (err) throw err;
        if (results.rows) {
          retweets = results.rows.length;
          // console.log(retweets);
          database.query(
            "update tweets set retweets = $1 where tweetid = $2 ",
            [retweets, tweet],
            (err, results) => {
              if (err) res.status(400).json({ status: false, message: err });
              // if (results.rows) console.log("Total tweet count fetched");
              // else res.status(400).json("Error in liking a tweet");
            }
          );
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
}

const addretweet = (req, res) => {
  try {
    const tweet = req.body.tweetid;
    database.query(
      "select * from retweet where user_id = $1 AND tweet_id = $2",
      [req.user.user_id, tweet],
      async (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results.rows.length) {
            res.status(400).json({ Message: "retweets Already added" });
          } else {
            database.query(
              "Insert into retweet (user_id,tweet_id) values ($1,$2)",
              [req.user.user_id, tweet],
              (err, results) => {
                if (err) res.status(400).json({ status: false, message: err });
                else {
                  if (results)
                    res
                      .status(200)
                      .json({ status: true, message: "Retweet inserted" });
                  else
                    res
                      .status(200)
                      .json({ status: false, message: "Tweet not inserted" });
                }
              }
            );
            await updateretweets(tweet);
          }
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const retweets = (req, res) => {
  try {
    const tweet = req.body.tweetid;
    database.query(
      "select user_id from retweet where tweet_id = $1",
      [tweet],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results.rows)
            res.status(200).json({ status: true, data: results.rows });
          else
            res
              .status(200)
              .json({ status: true, message: "Error in liking a tweet" });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const undoretweet = async (req, res) => {
  try {
    const tweet = await req.body.tweetid;
    database.query(
      "delete from retweet where user_id=$1 AND tweet_id=$2",
      [req.user.user_id, tweet],
      async (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            await res
              .status(200)
              .json({ status: true, message: "retweet removed" });
          else
            res
              .status(200)
              .json({ status: false, message: "retweet not removed" });
        }
      }
    );
    updateretweets(tweet);
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = { addretweet, undoretweet, retweets };
