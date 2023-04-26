const database = require("../../db.config");

// Need to insert the
// const allactivities = async (req, res) => {
//   // await database.query(
//   //   "select followerid from follow where followingid = $1;",
//   //   [req.user.user_id],
//   //   (err, results) => {
//   //     res.status(200).json(results.rows);
//   //   }
//   // );
// };

const mentionedactivities = async (req, res) => {
  try{
  database.query(
    "select followerid from follow where followingid = $1;",
    [req.user.user_id],
    (err, results) => {
      if(err)
      res.status(400).json(err);
      else
      res.status(200).json(results.rows);
    }
  );
};

// await database.query(
//   "select name,username,userid,tweetcontent,verified,retweets,replies,views,tweets.createdat,audience,replycircle,choice1,choice2,choice3,choice4,polllength,likes from UserAccount inner join tweets on UserAccount.id=tweets.userid where tweets.userid=$1 and UserAccount.verified is not null;",
//   [req.user.user_id],
//   (err, results) => {
//     res.status(200).json(results.rows);
//   }
// );
module.exports = { mentionedactivities };
