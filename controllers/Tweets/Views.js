const database = require("../../db.config");

const views = (req, res) => {
  try {
    const tweet = req.body.tweetid;
    database.query(
      "update tweets set views = views+1 where tweetid = $1",
      [tweet],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("Tweet view Updated");
          else res.status(200).json("Error in viewing a tweet");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { views };
