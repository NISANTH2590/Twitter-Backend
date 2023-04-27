const database = require("../../db.config");

const usertweets = async (req, res) => {
  try {
    await database.query(
      "select name,username,userid,tweetcontent,retweets,replies,views,tweets.createdat,audience,replycircle,choice1,choice2,choice3,choice4,polllength,likes from UserAccount inner join tweets on UserAccount.id=tweets.userid where tweets.userid=$1",
      [req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json(err);
        if (results) res.status(200).json(results.rows);
        else res.status(200).json("Tweet not inserted");
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

// await database.query(
//   "select name,username,userid,tweetcontent,retweets,replies,views,tweets.createdat,audience,replycircle,choice1,choice2,choice3,choice4,polllength,likes from UserAccount inner join tweets on UserAccount.id=tweets.userid where tweets.replyid=$1",
//   [req.user.user_id],
//   (err, results) => {
//     if (err) throw err;
//     if (results) res.status(200).json(results.rows);
//     else res.status(400).json("reply tweets not available");
//   }
// );

// const userreplytweets =  (req, res) => {
//   database.query(
//     "select name,username,userid,tweetcontent,retweets,replies,views,tweets.createdat,audience,replycircle,choice1,choice2,choice3,choice4,polllength,likes from UserAccount inner join tweets on UserAccount.id=tweets.userid where tweets.userid=$1",
//     [req.user.user_id],
//     (err, results) => {
//       if (err) throw err;
//       if (results) res.status(200).json(results.rows);
//       else res.status(400).json("Tweet not inserted");
//     }
//   );
// };

function inserthashtag(hashtag) {
  try {
    for (let i = 0; i < hashtag.length; i++) {
      database.query(
        "select * from hashtags where hashtags = $1",
        [hashtag[i].slice(0, hashtag[i].length)],
        async (err, results) => {
          // console.log(hashtag[i].slice(1, hashtag[i].length));
          if (err) res.status(400).json(err);
          if (results.rows.length) {
            database.query(
              "update hashtags set hashtagcount = hashtagcount+1 where hashtags = $1",
              [hashtag[i].slice(0, hashtag[i].length)],
              (err, results) => {
                if (err) throw err;
              }
            );
          } else {
            database.query(
              "Insert into hashtags (hashtags) values ($1)",
              [hashtag[i].slice(0, hashtag[i].length)],
              (err, results) => {
                if (err) throw err;
              }
            );
          }
        }
      );
    }
  } catch (err) {
    res.status(400).json(err);
  }
}

async function analytics(tweet) {
  try {
    await database.query(
      "Insert into tweetanalytics (tweetid,impressions,engagements,detail_expands,new_followers,profile_visits) values ($1,0,0,0,0,0)",
      [tweet],
      (err, results) => {
        if (err) res.status(400).json(err);
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
}

async function replies1(parenttweetid) {
  try {
    await database.query(
      "select count (replyid) from tweets where replyid = $1",
      [parenttweetid],
      async (err, results) => {
        if (err) throw err;
        await database.query(
          "UPDATE tweets SET replies = $1 WHERE tweetid = $2",
          [results.rows[0].count, parenttweetid],
          (err, results) => {
            if (err) throw err;
          }
        );
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
}

// async function retweets() {
//   await database.query(
//     "select count (replyid) from retweet where replyid = $1",
//     [parenttweetid],
//     async (err, results) => {
//       if (err) throw err;
//       await database.query(
//         "UPDATE tweets SET replies = $1 WHERE tweetid = $2",
//         [results.rows[0].count, parenttweetid],
//         (err, results) => {
//           if (err) throw err;
//         }
//       );
//     }
//   );
// }
// replies1(8);
function usernames(username, tweetid) {
  try {
    for (let i = 0; i < username.length; i++) {
      database.query(
        "Insert into mentions (tweetid,username) values ($1,$2)",
        [tweetid, username[i].slice(0, username[i].length)],
        (err, results) => {
          if (err) res.status(400).json(err);
        }
      );
    }
  } catch (err) {
    res.status(400).json(err);
  }
}
// If the user is going to mention the reply
const posttweet = async (req, res) => {
  try {
    const body = req.body;
    const tweetcontent = body.tweetcontent;
    const hashtags = tweetcontent.match(/#\w+/g);
    // console.log(hashtags + " ");
    const username = tweetcontent.match(/@\w+/g);
    if (hashtags) inserthashtag(hashtags);
    const tweetid = body.replytweetid;
    const commentid = body.commentid;
    const replytype = body.replytype;
    const media = body.mediaurl;
    const listid = body.listid;
    let retweet = 0,
      replies = 0,
      likes = 0,
      views = 0;
    if (tweetid && replytype == "usernames") {
      database.query(
        "select tweetid,id from UserAccount inner join mentions on UserAccount.username = mentions.username where mentions.tweetid = $1 ",
        [tweetid],
        (err, results) => {
          // console.log(results.rows.length);
          if (results.rows.length) {
            for (let i = 0; i < results.rows.length; i++) {
              if (req.user.user_id == results.rows[i].id) {
                // res.status(200).json("User Found he can Reply");
                database.query(
                  "Insert into tweets (userid,tweetcontent,retweets,likes,replies,views,createdat,schedule,choice1,choice2,choice3,choice4,polllength,replyid,replycircle,audience,mediaurl,listid) values ($1,$2,$3,$4,$5,$6,NOW(),$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) returning tweetid",
                  [
                    req.user.user_id,
                    body.tweetcontent,
                    retweet,
                    likes,
                    replies,
                    views,
                    body.schedule,
                    body.choice1,
                    body.choice2,
                    body.choice3,
                    body.choice4,
                    body.polllength,
                    body.replytweetid,
                    body.replycircle,
                    body.audience,
                    media,
                    listid,
                  ],
                  (err, results) => {
                    if (err) res.status(400).json(err);
                    else {
                      if (results.rows) {
                        if (username)
                          usernames(username, results.rows[0].tweetid);
                        res.status(200).json("Your Tweet was sent.");
                      } else res.status(200).json("Tweet not inserted");
                      // if (results)
                    }
                  }
                );
              }
            }
          }
        }
      );
    } else if (tweetid && replytype == "following") {
      userid1 = body.userid;
      database.query(
        "select followingid from follow where followerid=$1",
        [userid1],
        (err, results) => {
          if (results.rows.length) {
            for (let i = 0; i < results.rows.length; i++) {
              if (req.user.user_id == results.rows[i].followingid) {
                database.query(
                  "Insert into tweets (userid,tweetcontent,retweets,likes,replies,views,createdat,schedule,choice1,choice2,choice3,choice4,polllength,replyid,replycircle,audience,mediaurl,listid) values ($1,$2,$3,$4,$5,$6,NOW(),$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) returning tweetid",
                  [
                    req.user.user_id,
                    body.tweetcontent,
                    retweet,
                    likes,
                    replies,
                    views,
                    body.schedule,
                    body.choice1,
                    body.choice2,
                    body.choice3,
                    body.choice4,
                    body.polllength,
                    body.replytweetid,
                    body.replycircle,
                    body.audience,
                    media,
                    listid,
                  ],
                  (err, results) => {
                    if (err) res.status(400).json(err);
                    else {
                      if (results.rows) {
                        if (username)
                          usernames(username, results.rows[0].tweetid);
                        res.status(200).json("Your Tweet was sent.");
                      } else res.status(200).json("Tweet not inserted");
                      // if (results)
                    }
                  }
                );
              }
            }
          }
        }
      );
    } else if (tweetid && replytype == "everyone") {
      database.query(
        "Insert into tweets (userid,tweetcontent,retweets,likes,replies,views,createdat,schedule,choice1,choice2,choice3,choice4,polllength,replyid,replycircle,audience,mediaurl,listid) values ($1,$2,$3,$4,$5,$6,NOW(),$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) returning tweetid",
        [
          req.user.user_id,
          body.tweetcontent,
          retweet,
          likes,
          replies,
          views,
          body.schedule,
          body.choice1,
          body.choice2,
          body.choice3,
          body.choice4,
          body.polllength,
          body.replytweetid,
          body.replycircle,
          body.audience,
          media,
          listid,
        ],
        (err, results) => {
          if (err) res.status(400).json(err);
          else {
            if (results.rows) {
              if (username) usernames(username, results.rows[0].tweetid);
              res.status(200).json("Your Tweet was sent.");
            } else res.status(200).json("Tweet not inserted");
          }
        }
      );
    } else if (commentid) {
      database.query(
        "Insert into tweets (userid,tweetcontent,retweets,likes,replies,views,createdat,schedule,choice1,choice2,choice3,choice4,polllength,replycircle,audience,commentid,mediaurl,listid) values ($1,$2,$3,$4,$5,$6,NOW(),$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) returning tweetid",
        [
          req.user.user_id,
          body.tweetcontent,
          retweet,
          likes,
          replies,
          views,
          body.schedule,
          body.choice1,
          body.choice2,
          body.choice3,
          body.choice4,
          body.polllength,
          body.replycircle,
          body.audience,
          commentid,
          media,
          listid,
        ],
        (err, results) => {
          if (err) res.status(400).json(err);
          else {
            if (results.rows) {
              analytics(results.rows[0].tweetid);
              if (username) usernames(username, results.rows[0].tweetid);
              res.status(200).json("Your Tweet was sent.");
            } else res.status(200).json("Tweet not inserted");
          }
        }
      );
    } else {
      database.query(
        "Insert into tweets (userid,tweetcontent,retweets,likes,replies,views,createdat,schedule,choice1,choice2,choice3,choice4,polllength,replycircle,audience,mediaurl,listid) values ($1,$2,$3,$4,$5,$6,NOW(),$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) returning tweetid",
        [
          req.user.user_id,
          body.tweetcontent,
          retweet,
          likes,
          replies,
          views,
          body.schedule,
          body.choice1,
          body.choice2,
          body.choice3,
          body.choice4,
          body.polllength,
          body.replycircle,
          body.audience,
          media,
          listid,
        ],
        (err, results) => {
          if (err) res.status(400).json(err);
          else {
            if (results.rows) {
              analytics(results.rows[0].tweetid);
              if (username) usernames(username, results.rows[0].tweetid);
              res.status(200).json("Your Tweet was sent.");
            } else res.status(200).json("Tweet not inserted");
          }
        }
      );
    }
    await retweets();
    await replies1(tweetid);
  } catch (err) {
    res.status(400).json(err);
  }
};
//Function to display the entire tweets
const showtweet = async (req, res) => {
  try {
    // const userid = req.body.tweetuserid;
    // await database.query(
    //   "select userid,tweetcontent,retweets,replies,views,tweets.createdat,audience,replycircle,choice1,choice2,choice3,choice4,polllength from tweets inner join twittercircle on tweets.userid = twittercircle.user_id where friendid = $1 and replyid is null and twittercircle is not null",
    //   [req.user.user_id],
    //   (err, results) => {
    //     if (err) throw err;
    //     if (results.rows.length) {
    //       res.status(200).json(results.rows);
    //     } else res.status(400).json("Tweets are not available");
    //   }
    // );
    let limit, offset;
    limit = req.body.limit;
    offset = req.body.offset;
    if (!limit) limit = 10;
    if (!offset) offset = 0;
    offset = limit * offset;
    Promise.all([
      database.query(
        "select name,username,id,verified,userid,tweetid,tweetcontent,likes,retweets,replies,views,tweets.createdat,audience,replycircle,choice1,choice2,choice3,choice4,polllength,replyid,mediaurl,commentid,choice1_votes,choice2_votes,choice3_votes,choice4_votes from tweets inner join UserAccount on tweets.userid = UserAccount.id  inner join twittercircle on tweets.userid = twittercircle.user_id where friendid = $1 and replyid is null and tweets.audience is not null limit $2 offset $3",
        [req.user.user_id, limit, offset]
      ),
      database.query(
        "select name,username,id,verified,userid,tweetid,tweetcontent,likes,retweets,replies,views,tweets.createdat,audience,replycircle,choice1,choice2,choice3,choice4,polllength,replyid,mediaurl,commentid,choice1_votes,choice2_votes,choice3_votes,choice4_votes from tweets inner join UserAccount on tweets.userid = UserAccount.id  inner join twittercircle on tweets.userid = twittercircle.user_id where replyid is null and tweets.audience is null limit $1 offset $2",
        // [req.user.user_id]
        [limit, offset]
      ),
    ]).then(
      function ([twittercircletweets, everytweet]) {
        res.status(200).json({
          twittercircletweets: twittercircletweets.rows,
          everyone: everytweet.rows,
        });
      },
      function (error) {
        res.status(400).json(error);
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

// for (let i = 0; i < results.rows.length; i++) {
//   if (results.rows.user_id == userid)
//     database.query(
//       "select userid,tweetcontent,retweets,replies,views,tweets.createdat,audience,replycircle,choice1,choice2,choice3,choice4,polllength from tweets where replyid is null",
//       (err, results) => {
//         if (err) throw err;
//         if (results) res.status(200).json(results.rows);
//         else res.status(400).json("Tweet not inserted");
//       }
//     );
// }

// const tweet = req.body.tweetid;

const deletetweet = (req, res) => {
  try {
    const tweetid = req.body.tweetid;
    database.query(
      "delete from tweets where userid=$1 AND tweetid=$2 ",
      [req.user.user_id, tweetid],
      (err, results) => {
        if (err) res.status(400).json(err);
        else {
          if (results) res.status(200).json("Your tweet was deleted.");
          else res.status(200).json("Your tweet was not deleted.");
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { usertweets, posttweet, deletetweet, showtweet };
