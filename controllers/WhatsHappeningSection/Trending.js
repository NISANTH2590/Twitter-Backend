const database = require("../../db.config");

const trendinghashtags = (req, res) => {
  // console.log("forYou");
  try {
    let limit, offset;
    limit = req.body.limit;
    offset = req.body.offset;
    if (!limit) limit = 4;
    if (!offset) offset = 0;
    offset = limit * offset;
    database.query(
      "select hashtags,hashtagcount,category from hashtags order by hashtagcount DESC limit  $1 offset $2 ",
      [limit, offset],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results) {
            res.status(200).json({ status: true, data: results.rows });
          } else
            res
              .status(200)
              .json({ status: false, message: "HashTags not Displayed." });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const trendingSection = (req, res) => {
  // console.log("trending");
  let limit, offset;
  limit = req.body.limit;
  offset = req.body.offset;
  if (!limit) limit = 10;
  if (!offset) offset = 0;
  offset = limit * offset;
  database.query(
    `SELECT hashtags,hashtagcount,category
    FROM hashtags
    WHERE category = 'trendinginindia'
    ORDER BY hashtagcount DESC
    LIMIT $1
    OFFSET $2;`,
    [limit, offset],
    (err, results) => {
      if (err) res.status(400).json({ status: false, message: err });
      if (results) {
        res.status(200).json({ status: true, data: results.rows });
      } else res.status(400).json("HashTags not Displayed.");
    }
  );
};

const trendinghashtags_entertainment = (req, res) => {
  // console.log("entertainment");
  try {
    let limit, offset;
    limit = req.body.limit;
    offset = req.body.offset;
    if (!limit) limit = 10;
    if (!offset) offset = 0;
    offset = limit * offset;
    database.query(
      "select hashtags,hashtagcount,category from hashtags where category = $1 order by hashtagcount DESC limit  $2 offset $3",
      ["entertainment", limit, offset],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results) {
            console.log(limit, offset);
            res.status(200).json({ status: true, data: results.rows });
          } else
            res
              .status(200)
              .json({ status: false, message: "HashTags not Displayed." });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const trendinghashtags_news = (req, res) => {
  // console.log("news");
  try {
    let limit, offset;
    limit = req.body.limit;
    offset = req.body.offset;
    if (!limit) limit = 10;
    if (!offset) offset = 0;
    offset = limit * offset;
    database.query(
      "select hashtags,hashtagcount,category from hashtags where category = $1 order by hashtagcount DESC limit  $2 offset $3",
      ["news", limit, offset],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res.status(200).json({ status: true, data: results.rows });
          else
            res
              .status(200)
              .json({ status: false, message: "HashTags not Displayed." });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const trendinghashtags_sports = (req, res) => {
  // console.log("sports");
  try {
    let limit, offset;
    limit = req.body.limit;
    offset = req.body.offset;
    if (!limit) limit = 10;
    if (!offset) offset = 0;
    offset = limit * offset;
    database.query(
      "select hashtags,hashtagcount,category from hashtags where category = $1 order by hashtagcount DESC limit  $2 offset $3",
      ["sports", limit, offset],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res.status(200).json({ status: true, data: results.rows });
          else
            res
              .status(200)
              .json({ status: false, message: "HashTags not Displayed." });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};
module.exports = {
  trendinghashtags,
  trendingSection,
  trendinghashtags_entertainment,
  trendinghashtags_sports,
  trendinghashtags_news,
};
