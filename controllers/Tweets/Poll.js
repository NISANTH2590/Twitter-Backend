const database = require("../../db.config");

const add_vote_choice1 = (req, res) => {
  try {
    const tweetid = req.body.tweetid;
    const vote = req.body.vote;
    database.query(
      "update tweets set choice1_votes = $1 where tweetid = $2",
      [vote, tweetid],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res.status(200).json({ status: true, message: "poll voted" });
          else
            res
              .status(200)
              .json({ status: false, message: "Error in voting a tweet" });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};
const add_vote_choice2 = (req, res) => {
  try {
    const tweetid = req.body.tweetid;
    const vote = req.body.vote;
    database.query(
      "update tweets set choice1_votes = $1 where tweetid = $2",
      [vote, tweetid],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res.status(200).json({ status: true, message: "poll voted" });
          else
            res
              .status(200)
              .json({ status: false, message: "Error in voting a tweet" });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};
const add_vote_choice3 = (req, res) => {
  try {
    const tweetid = req.body.tweetid;
    const vote = req.body.vote;
    database.query(
      "update tweets set choice1_votes = $1 where tweetid = $2",
      [vote, tweetid],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res.status(200).json({ status: true, message: "poll voted" });
          else
            res
              .status(200)
              .json({ status: false, message: "Error in voting a tweet" });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};
const add_vote_choice4 = (req, res) => {
  try {
    const tweetid = req.body.tweetid;
    const vote = req.body.vote;
    database.query(
      "update tweets set choice1_votes = $1 where tweetid = $2",
      [vote, tweetid],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res.status(200).json({ status: true, message: "poll voted" });
          else
            res
              .status(200)
              .json({ status: false, message: "Error in voting a tweet" });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = {
  add_vote_choice1,
  add_vote_choice2,
  add_vote_choice3,
  add_vote_choice4,
};
