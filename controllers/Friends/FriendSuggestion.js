const database = require("../../db.config");

const showfriends = (req, res) => {
  try {
    let limit, offset;
    limit = req.body.limit;
    offset = req.body.offset;
    if (!limit) limit = 3;
    if (!offset) offset = 0;
    offset = limit * offset;
    database.query(
      "select id,name,username,profilepicture_url,bio,verified from UserAccount where id!=$1 limit  $2 offset $3",
      [req.user.user_id, limit, offset],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res.status(200).json({ status: true, data: results.rows });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = { showfriends };
