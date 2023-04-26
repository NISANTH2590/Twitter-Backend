const database = require("../../db.config");

const createlist = (req, res) => {
  try {
    let body = req.body;
    database.query(
      "insert into lists (profilepic_url,name,description,private,adminid) values ($1,$2,$3,$4,$5)",
      [
        body.profileurl,
        body.name,
        body.description,
        body.private,
        req.user.user_id,
      ],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("List Added");
          else res.status(200).json("List not Added");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

// const lists = (req, res) => {
//   // Need to be cross checked !!
//   database.query(
//     "select UserAccount.name , UserAccount.username,listid,lists.profilepic_url from lists join UserAccount on UserAccount.id = lists.adminid",
//     (err, results) => {
//       if (err) throw err;
//       if (results.rows.length) res.status(200).json(results.rows);
//       else res.status(400).json("List not Added");
//     }
//   );
// };

const user_lists = (req, res) => {
  try {
    database.query(
      "select name from lists join user_lists on user_lists.listid = lists.listid where user_lists.userid=$1",
      [req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results.rows.length) res.status(200).json(results.rows);
          else res.status(200).json("no user lists");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const deletelist = (req, res) => {
  try {
    let listid = req.body.listid;
    database.query(
      "delete from lists where listid = $1",
      [listid],
      (err, results) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json("List Removed");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const addtweet = (req, res) => {
  try {
    const body = req.body;
    database.query(
      "insert into list_tweets (listid,tweetid) values ($1,$2)",
      [body.listid, body.tweetid],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("Tweet added to the list");
          else res.status(200).json("Tweet not Added to the list");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const display_list_tweet = (req, res) => {
  try {
    const listid = req.body.listid;
    database.query(
      "select * from list_tweets join tweets on tweets.tweetid = list_tweets.tweetid where list_tweets.listid = $1",
      [listid],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("Tweet added to the list");
          else res.status(200).json("Tweet not Added to the list");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const addlist = (req, res) => {
  try {
    const body = req.body;
    database.query(
      "insert into user_lists (userid ,listid) values ($1,$2)",
      [body.userid, body.listid],
      (err, results) => {
        if (err) res.status(400).json(err);
        {
          if (results) res.status(200).json("user list added");
          else res.status(200).json("user list not Added");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createlist,
  user_lists,
  addtweet,
  deletelist,
  addlist,
  display_list_tweet,
};
