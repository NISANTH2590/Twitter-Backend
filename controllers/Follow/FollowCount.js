const database = require("../../db.config");

const followcount = async (req, res) => {
  try {
    Promise.all([
      database.query("select followingid from follow where followerid = $1", [
        req.user.user_id,
      ]),
      database.query("select followerid from follow where followingid = $1", [
        req.user.user_id,
      ]),
    ]).then(
      function ([following, followers]) {
        res.status(200).json({
          status: true,
          following: following.rows.length,
          followers: followers.rows.length,
        });
      },
      function (error) {
        res.status(400).json({ status: false, message: error });
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

//   let count = 0,
//     count1 = 0;
//   await database.query(
//     "select followingid from follow where followersid = $1",
//     [req.user.user_id],
//     (err, results) => {
//       if (err) throw err;
//       if (results.rows.length) {
//         for (let i = 0; i < results.rows.length; i++) count++;
//         res.status(200).json({ following: count });
//       } else {
//         res.status(200).json({ following: "0" });
//       }
//     }
//   );

//   await database.query(
//     "select followersid from follow where followingid = $1",
//     [req.user.user_id],
//     (err, results) => {
//       if (err) throw err;
//       if (results.rows.length) {
//         for (let i = 0; i < results.rows.length; i++) count++;
//         res.status(200).json({ followers: count });
//       } else {
//         res.status(200).json({ followers: "0" });
//       }
//     }
//   );

module.exports = { followcount };
