const database = require("../../db.config");

const DisplayLanguages = (req, res) => {
  try {
    database.query("select * from languages", (err, results, fields) => {
      if (err) res.status(400).json(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const RegisterLanguages = async (req, res) => {
  const user_languages = req.body.user_languages;
  const user_categories = req.body.user_categories;
  // for (let i = 0; i < user_languages.length || user_categories.length; i++) {
  //   Promise.all([
  //     database.query(
  //       "insert into user_languages (id,languages) values($1,$2)",
  //       [req.user.user_id, user_languages[i]]
  //     ),
  //     database.query("insert into category (userid,category) values($1,$2)", [
  //       req.user.user_id,
  //       user_categories[i],
  //     ]),
  //   ]).then(
  //     function ([]) {
  //       res.status(200).json({
  //         message: "Languages and categories inserted",
  //       });
  //     },
  //     function (error) {
  //       res.status(400).json(error);
  //     }
  //   );
  // }
  for (let i = 0; i < user_languages.length; i++) {
    try {
      database.query(
        "insert into user_languages (id,languages) values($1,$2)",
        [req.user.user_id, user_languages[i]],
        async (err, results) => {
          if (err) res.status(400).json(err);
          // if (results)
          // await res.status(200).json({ message: "User languages Inserted" });
        }
      );
      for (let i = 0; i < user_categories.length; i++) {
        database.query(
          "insert into category (userid,category) values($1,$2)",
          [req.user.user_id, user_categories[i]],
          async (err, results) => {
            if (err) res.status(400).json(err);
            if (results)
              res.status(200).json({ message: "User categories Inserted" });
          }
        );
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

const UserLanguages = (req, res) => {
  try {
    database.query(
      "select languages from user_languages where id = $1",
      [req.user.user_id],
      (err, results, fields) => {
        if (err) res.status(400).json(err);
        else {
          res.status(200).json(results.rows);
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { DisplayLanguages, RegisterLanguages, UserLanguages };
