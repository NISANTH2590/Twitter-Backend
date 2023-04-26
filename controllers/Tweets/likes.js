const database = require("../../db.config");

const likedtweets = (req, res) => {
  // updateretweets(tweet, req.user.user_id);
  try {
    database.query(
      "select name,username,tweetcontent,retweets,tweetid,choice1,choice2,choice3,choice4,polllength,replies,views,tweets.createdat,audience,replycircle,likes from UserAccount inner join tweets on UserAccount.id=tweets.userid inner join likes on tweets.userid = likes.user_id AND tweets.tweetid = likes.tweet_id where likes.user_id=$1",
      [req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json(results.rows);
          else res.status(400).json("Tweet not inserted");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

async function tweetlikes(tweet) {
  try {
    let likes = 0;
    await database.query(
      "select user_id from likes where tweet_id = $1",
      [tweet],
      (err, results) => {
        if (err) res.status(400).json(err);
        if (results.rows) {
          likes = results.rows.length;
          // console.log(likes);
          database.query(
            "update tweets set likes = $1 where tweetid = $2 ",
            [likes, tweet],
            (err, results) => {
              if (err) res.status(400).json(err);
              // if (results.rows) console.log("Total tweet count fetched");
              // else res.status(400).json("Error in liking a tweet");
            }
          );
        } else res.status(200).json("Error in liking a tweet");
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
}

const addlike = (req, res) => {
  try {
    const tweet = req.body.tweetid;
    database.query(
      "select * from likes where user_id = $1 AND tweet_id = $2",
      [req.user.user_id, tweet],
      async (err, results) => {
        if (err) throw err;
        if (results.rows.length) {
          res.status(400).json({ Message: "Likes Already added" });
        } else {
          await database.query(
            "Insert into likes (user_id,tweet_id) values ($1,$2)",
            [req.user.user_id, tweet],
            (err, results) => {
              if (err) res.status(400).json(err);
              else {
                if (results) res.status(200).json("Tweet liked");
                else res.status(400).json("Error in liking a tweet");
              }
            }
          );
          await tweetlikes(tweet);
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const likedbyuser = (req, res) => {
  try {
    const tweet = req.body.tweetid;
    tweetlikes(tweet);
    database.query(
      "select id,name,username from likes inner join UserAccount on user_id = UserAccount.id where tweet_id = $1",
      [tweet],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json(results.rows);
          else res.status(400).json("Error in liking a tweet");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const unlike = (req, res) => {
  try {
    const tweet = req.body.tweetid;
    database.query(
      "delete from likes where user_id=$1 AND tweet_id=$2",
      [req.user.user_id, tweet],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("Tweet unliked");
          else res.status(400).json("Error in unliking a tweet");
        }
      }
    );
    tweetlikes(tweet);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { likedtweets, addlike, unlike, likedbyuser };
