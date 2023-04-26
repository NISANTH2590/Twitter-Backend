const e = require("express");
const database = require("../../db.config");

const impressions = async (req, res) => {
  try {
    const tweet = req.body.tweetid;
    await database.query(
      "update tweetanalytics set impressions = impressions+1 where tweetid=$1",
      [tweet],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("impressions added");
          else res.status(200).json("Error in impressions of a tweet");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

// add the insertion at the creation of the tweett!!!!!!

const Engagements = async (req, res) => {
  try {
    const tweet = req.body.tweetid;
    await database.query(
      "update tweetanalytics set engagements = engagements+1 where tweetid=$1",
      [tweet],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("Engagements added");
          else res.status(200).json("Error in Engagements of a tweet");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const Detail_expands = async (req, res) => {
  try {
    const tweet = req.body.tweetid;
    await database.query(
      "update tweetanalytics set detail_expands = detail_expands+1 where tweetid=$1",
      [tweet],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("Detail_expands added");
          else res.status(200).json("Error in Detail_expands of a tweet");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const New_followers = async (req, res) => {
  try {
    const tweet = req.body.tweetid;
    await database.query(
      "update tweetanalytics set new_followers = new_followers+1 where tweetid=$1",
      [tweet],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("New_followers added");
          else res.status(200).json("Error in New_followers of a tweet");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const Profile_visits = async (req, res) => {
  try {
    const tweet = req.body.tweetid;
    await database.query(
      "update tweetanalytics set profile_visits = profile_visits+1 where tweetid=$1",
      [tweet],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("Profile_visits added");
          else res.status(200).json("Error in Profile_visits of a tweet");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const viewanalytics = async (req, res) => {
  try {
    const tweet = req.body.tweetid;
    await database.query(
      "select * from tweetanalytics where tweetid=$1",
      [tweet],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json(results.rows);
          else res.status(200).json("Error in fetching analytics of a tweet");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  impressions,
  Engagements,
  Detail_expands,
  New_followers,
  Profile_visits,
  viewanalytics,
};
