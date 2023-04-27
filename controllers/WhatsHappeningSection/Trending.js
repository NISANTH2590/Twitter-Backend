const database = require("../../db.config");

const trendinghashtags = (req, res) => {
  try {
    let limit, offset;
    limit = req.body.limit;
    offset = req.body.offset;
    if (!limit) limit = 5;
    if (!offset) offset = 0;
    offset = limit * offset;
    database.query(
      "select hashtags,hashtagcount from hashtags order by hashtagcount DESC limit  $1 offset $2 ",
      [limit, offset],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json(results.rows);
          else res.status(200).json("HashTags not Displayed.");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

// ITs only for music !!

// const trendinghashtags_trending= (req, res) => {
//   let limit, offset;
//   limit = req.body.limit;
//   offset = req.body.offset;
//   if (!limit) limit = 10;
//   if (!offset) offset = 0;
//   offset = limit * offset;
//   database.query(
//     "select hashtags,hashtagcount from hashtags order by hashtagcount DESC limit  $1 offset $2 where category = music",
//     [limit, offset],
//     (err, results) => {
//       if (err) throw err;
//       if (results) res.status(200).json(results.rows);
//       else res.status(400).json("HashTags not Displayed.");
//     }
//   );
// };

const trendinghashtags_entertainment = (req, res) => {
  try {
    let limit, offset;
    limit = req.body.limit;
    offset = req.body.offset;
    if (!limit) limit = 10;
    if (!offset) offset = 0;
    offset = limit * offset;
    database.query(
      "select hashtags,hashtagcount from hashtags where category = $1 order by hashtagcount DESC limit  $2 offset $3",
      ["entertainment", limit, offset],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json(results.rows);
          else res.status(200).json("HashTags not Displayed.");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const trendinghashtags_news = (req, res) => {
  try {
    let limit, offset;
    limit = req.body.limit;
    offset = req.body.offset;
    if (!limit) limit = 10;
    if (!offset) offset = 0;
    offset = limit * offset;
    database.query(
      "select hashtags,hashtagcount from hashtags where category = $1 order by hashtagcount DESC limit  $2 offset $3",
      ["news", limit, offset],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json(results.rows);
          else res.status(200).json("HashTags not Displayed.");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

const trendinghashtags_sports = (req, res) => {
  try {
    let limit, offset;
    limit = req.body.limit;
    offset = req.body.offset;
    if (!limit) limit = 10;
    if (!offset) offset = 0;
    offset = limit * offset;
    database.query(
      "select hashtags,hashtagcount from hashtags where category = $1 order by hashtagcount DESC limit  $2 offset $3",
      ["sports", limit, offset],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json(results.rows);
          else res.status(200).json("HashTags not Displayed.");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  trendinghashtags,
  trendinghashtags_entertainment,
  trendinghashtags_sports,
  trendinghashtags_news,
};
