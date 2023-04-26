const database = require("../../db.config");

const bookmarks = (req, res) => {
  try {
    database.query(
      "select name,username,id,verified,tweets.userid,tweets.tweetid,tweetcontent,likes,retweets,replies,views,tweets.createdat,audience,replycircle,choice1,choice2,choice3,choice4,polllength from UserAccount inner join bookmarks on UserAccount.id=bookmarks.userid inner join tweets on tweets.tweetid = bookmarks.tweetid where bookmarks.userid = $1",
      [req.user.user_id],
      async (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results.rows.length) {
            res.status(200).json(results.rows);
          } else {
            res.status(200).json("No bookmarks");
          }
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const addbookmark = (req, res) => {
  try {
    const tweet = req.body.tweetid;
    database.query(
      "select * from bookmarks where userid = $1 AND tweetid = $2",
      [req.user.user_id, tweet],
      async (err, results) => {
        if (err) res.status(400).json(err);
        //   console.log(results.rows.length);
        if (results.rows.length) {
          res.status(200).json({ Message: "Bookmarks Already added" });
        } else {
          // console.log(results.rows.length + "i");
          await database.query(
            "insert into bookmarks (tweetid,userid) values ($1,$2)",
            [tweet, req.user.user_id],
            (err, results) => {
              if (err) res.status(400).json(err);
              else {
                if (results)
                  res.status(200).json("Tweet added to your Bookmarks.");
                else res.status(200).json("Tweet not added to your Bookmarks.");
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

const removebookmark = (req, res) => {
  try {
    const tweet = req.body.tweetid;
    database.query(
      "delete from bookmarks where tweetid = $1 and userid = $2",
      [tweet, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("Tweet removed from Bookmarks.");
          else res.status(200).json("Suggestions not Displayed");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteallbookmarks = (req, res) => {
  try {
    database.query(
      "delete from bookmarks where userid = $1",
      [req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("All bookmarks Deleted");
          else res.status(200).json("All bookmarks not Deleted");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { addbookmark, deleteallbookmarks, removebookmark, bookmarks };
