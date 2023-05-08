const database = require("../../db.config");

const addnotinterested = (req, res) => {
  //   const tweet = req.body.tweetid;
  try {
    const topic = req.body.category;
    database.query(
      "select * from notinterested where userid = $1 AND topic = $2",
      [req.user.user_id, topic],
      async (err, results) => {
        if (err) throw err;
        if (results.rows.length) {
          res.status(200).json({ Message: "not_interested Already added" });
        } else {
          await database.query(
            "insert into notinterested (userid,topic) values ($1,$2))",
            [req.user.user_id, topic],
            (err, results) => {
              if (err) res.status(400).json({ status: false, message: err });
              else {
                if (results)
                  res
                    .status(200)
                    .json("topic are added to your notinterested.");
                else
                  res
                    .status(200)
                    .json("topic are not added to your notinterested.");
              }
            }
          );
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const removenotinterested = (req, res) => {
  try {
    const topic = req.body.category;
    database.query(
      "delete from notinterested where topic = $1 and userid = $2",
      [topic, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res
              .status(200)
              .json({
                status: true,
                message: "topic removed from notinterested.",
              });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

// const deleteallbookmarks = (req, res) => {
//   database.query("delete from notinterested", (err, results) => {
//     if (err) throw err;
//     if (results) res.status(200).json("All bookmarks Deleted");
//     else res.status(400).json("All bookmarks not Deleted");
//   });
// };

module.exports = { addnotinterested, removenotinterested };
