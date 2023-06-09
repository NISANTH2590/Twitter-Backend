const database = require("../../db.config");
const schedule = require("node-schedule");

// schedule.scheduleJob("0 * * * * ", async () => {
//   try {
//     database.query(
//       "select schedule,tweetid,replyid from unsenttweets where schedule is not null",
//       async (err, results) => {
// //         if (err) res.status(400).json({ status: false, message: err });
//         if (results.rows.length) {
//           var tweetid;
//           var replyid;
//           for (let i = 0; i < results.rows.length; i++) {
//             const date = new Date(results.rows[i].schedule);
//             tweetid = results.rows[i].tweetid;
//             const currentDate = new Date();
//             const tweetdate = date;
//             const tweettime = date;
//             if (tweetdate.getDate() == currentDate.getDate()) {
//               var s = tweettime.getTime() - currentDate.getTime();
//               var ms = s % 1000;
//               s = (s - ms) / 1000;
//               var secs = s % 60;
//               s = (s - secs) / 60;
//               var mins = s % 60;
//               var hrs = (s - mins) / 60;
//               if (hrs == 0 && mins <= 59 && !replyid) {
//                 database.query(
//                   "insert into tweets(userid,tweetcontent,retweets,likes,replies,views,createdat,schedule,choice1,choice2,choice3,choice4,polllength,audience,replycircle) select userid,tweetcontent,retweets,likes,replies,views,createdat,schedule,choice1,choice2,choice3,choice4,polllength,audience,replycircle  from unsenttweets where tweetid = $1",
//                   [tweetid],
//                   (err, results) => {
//                     if (err)
// //                       res.status(400).json({ status: false, message: err });
//                   }
//                 );
//                 database.query(
//                   "delete from unsenttweets where tweetid = $1",
//                   [parseInt(tweetid)],
//                   (err, results) => {
//                     if (err)
// //                       res.status(400).json({ status: false, message: err });
//                     // if (results) console.log("unsent tweets deleted");
//                     // else res.status(400).json("unsent tweets not deleted");
//                   }
//                 );
//               }
//               // else {
//               //   console.log(
//               //     "No tweets are available from unsenttweets within 1 hour"
//               //   );
//               // }
//             }
//             //  else {
//             //   console.log(tweetdate.getTime(), currentDate.getDate());
//             // }
//           }
//         }
// //         // else res.status(400).json("Tweet not displayed");
//       }
//     );
//   } catch (err) {
// //    res.status(400).json({ status: false, message: err });
//   }
// });

const addunsenttweet = (req, res) => {
  try {
    const body = req.body;

    database.query(
      "Insert into unsenttweets (userid,tweetcontent,retweets,likes,replies,views,createdat,schedule,choice1,choice2,choice3,choice4,polllength,audience,replycircle) values ($1,$2,$3,$4,$5,$6,NOW(),$7,$8,$9,$10,$11,$12,$13,$14)",
      [
        req.user.user_id,
        body.tweetcontent,
        0,
        0,
        0,
        0,
        body.schedule,
        body.choice1,
        body.choice2,
        body.choice3,
        body.choice4,
        body.polllength,
        body.audience,
        body.replycircle,
      ],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res.status(200).json({ status: true, message: "Tweet inserted" });
          else
            res
              .status(200)
              .json({ status: false, message: "Tweet not inserted" });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const displayunsenttweets = (req, res) => {
  try {
    database.query(
      "select tweetcontent,tweetid from unsenttweets where userid = $1",
      [req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res.status(200).json({ status: true, data: results.rows });
          else
            res
              .status(200)
              .json({ status: true, message: "Tweets not displayed" });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const unsenttweets = (req, res) => {
  try {
    database.query(
      "select tweetid,tweetcontent,choice1,choice2,choice3,choice4,polllength,audience,replycircle,schedule from unsenttweets where userid = $1",
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res.status(200).json({ status: true, data: results.rows });
          else
            res
              .status(200)
              .json({ status: false, message: "Tweet not displayed" });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const deleteunsenttweets = (req, res) => {
  try {
    const tweet = req.body.tweetid;
    database.query(
      "delete from unsenttweets where userid = $1 AND tweetid = $2",
      [req.user.user_id, tweet],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res
              .status(200)
              .json({ status: true, message: "unsent tweets deleted" });
          else
            res
              .status(200)
              .json({ status: false, message: "unsent tweets not deleted" });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = {
  addunsenttweet,
  displayunsenttweets,
  unsenttweets,
  deleteunsenttweets,
};
