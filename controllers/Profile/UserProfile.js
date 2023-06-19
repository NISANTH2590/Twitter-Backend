const database = require("../../db.config");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { api_key, api_cloud, api_secret } = process.env;
const fs = require("fs");
// const multer=require('multer');
// const ejs=require('ejs');
// const path=require('path');
// require('dotenv').config();
// console.log(process.env.api_cloud, process.env.api_key, process.env.api_secret);
cloudinary.config({
  cloud_name: api_cloud,
  api_key: api_key,
  api_secret: api_secret,
});

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    let name =
      file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});

const uploadpic = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImage");

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|mp4/;

  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  // console.log(file);
  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb("Error");
  }
}

// const app=express();
// app.post('/',(req,res)=>console.log("hello"));
// app.post('/upload',(req,res)=>{
//     upload(req,res,async(err)=>{
//         if(err)
//             res.status(400).json({message:"Does not match!"});
//         else{
//         let url=await cloudinary.uploader.upload(req.file.path);
//         console.log(url);
//         fs.unlinkSync(req.file.path);
//         }

//     })
// });

const upload = (req, res) => {
  try {
    uploadpic(req, res, async (err) => {
      if (err) {
        if (err) res.status(400).json({ status: false, message: err });
      } else {
        let url = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "auto",
        });
        // console.log(url.secure_url);
        // database.query(
        //   "update UserAccount set profilepicture_url=$1 where id = $2",
        //   [url.secure_url, req.user.user_id],
        //   (err, results) => {
        //     if (err) res.status(400).json({ status: false, message: err });
        //     else if (results) {
        //       res
        //         .status(200)
        //         .json({ status: true, message: "Profile Picture Updated" });
        //     }
        //   }
        // );
        // database.query(
        //   "update UserAccount set header=$1 where id = $2",
        //   [url.secure_url, req.user.user_id],
        //   (err, results) => {
        //     if (err) res.status(400).json({ status: false, message: err });
        //     else if (results) {
        //       res
        //         .status(200)
        //         .json({ status: true, message: "Profile Picture Updated" });
        //     }
        //   }
        // );

        // database.query(
        //   `CREATE OR REPLACE FUNCTION generate_random_location() RETURNS TEXT AS $$
        //   DECLARE
        //       random_place TEXT;
        //   BEGIN
        //       SELECT place
        //       FROM unnest(ARRAY['New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Rome', 'Berlin', 'Moscow', 'Los Angeles', 'Toronto', 'Mumbai', 'Rio de Janeiro', 'Cape Town', 'Dubai', 'Amsterdam', 'Stockholm', 'Buenos Aires', 'Seoul', 'Cairo', 'Athens', 'Hong Kong', 'Singapore', 'Barcelona', 'Helsinki', 'Mexico City', 'Vienna', 'Zurich', 'Prague', 'Bangkok', 'Dublin', 'Delhi', 'Nairobi', 'Istanbul', 'Beijing', 'Melbourne', 'Vancouver', 'San Francisco', 'Madrid', 'Lisbon', 'Warsaw', 'Brussels', 'Budapest', 'Jakarta', 'Havana', 'Edinburgh', 'Marrakech', 'São Paulo', 'Wellington', 'Copenhagen', 'Reykjavik'])
        //       AS place ORDER BY random() LIMIT 1 INTO random_place;

        //       RETURN random_place;
        //   END;
        //   $$ LANGUAGE plpgsql;
        //   UPDATE useraccount
        //   SET location = generate_random_location()
        //   WHERE location IS NULL OR location = '';`,

        //   (err, results) => {
        //     if (err) res.status(400).json({ status: false, message: err });
        //     else if (results) {
        //       res
        //         .status(200)
        //         .json({ status: true, message: "Profile Picture Updated" });
        //     }
        //   }
        // );

        // const res = await cloudinary.uploader.upload(req.file.path);
        // res
        //   .then((data) => {
        //     console.log(data);
        //     console.log(data.secure_url);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        fs.unlinkSync(req.file.path);
      }
    });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const userProfile = async (req, res) => {
  // res.send("hello");
  try {
    await database.query(
      "SELECT ua.id,ua.name,ua.username,ua.profilepicture_url,ua.header,ua.bio,ua.website,ua.verified,ua.createdat,ua.gender,ua.location,ua.birthdate,(SELECT COUNT(userid) FROM tweets WHERE userid = $1) AS tweet_count,(SELECT COUNT(followingid) FROM follow WHERE followerid = $1) AS following_count,(SELECT COUNT(followerid) FROM follow WHERE followingid = $1) AS follower_count FROM UserAccount ua WHERE ua.id = $1;",
      [req.user.user_id],
      async (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else res.status(200).json({ status: true, data: results.rows });
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const friendProfile = async (req, res) => {
  try {
    let friendUserName = req.body.friendUserName;
    if (friendUserName) {
      await database.query(
        "SELECT ua.id FROM UserAccount ua WHERE ua.username = $1;",
        [friendUserName],
        async (err, results) => {
          if (err) res.status(400).json({ status: false, message: err });
          else {
            let friendId = results.rows[0].id;
            if (friendId)
              await database.query(
                "SELECT ua.id,ua.name,ua.username,ua.profilepicture_url,ua.header,ua.bio,ua.website,ua.verified,ua.createdat,ua.gender,ua.location,ua.birthdate,(SELECT COUNT(userid) FROM tweets WHERE userid = $1) AS tweet_count,(SELECT COUNT(followingid) FROM follow WHERE followerid = $1) AS following_count,(SELECT COUNT(followerid) FROM follow WHERE followingid = $1) AS follower_count FROM UserAccount ua WHERE ua.id = $1;",
                [friendId],
                async (err, results) => {
                  if (err)
                    res.status(400).json({ status: false, message: err });
                  else {
                    let data = results.rows[0];

                    let visibilityDob = true;
                    // console.log("sad1qqqq9rdywi3y");
                    await database.query(
                      `Select * from dobvisiblity where userid =${friendId}`,
                      async (err, results) => {
                        const { monthdayvisiblity, yearvisiblity } =
                          results.rows[0];
                        if (monthdayvisiblity == "yourfollowers") {
                          // console.log("sad1qqqq");
                          database.query(
                            `select followerid from follow where followingid =${friendId} AND followerid = ${req.user.user_id}`,
                            (err, results) => {
                              if (!results.rows.length) {
                                visibilityDob = false;
                                res.status(200).json({
                                  status: true,
                                  data: data,
                                  visibility: visibilityDob,
                                });
                              } else {
                                res.status(200).json({
                                  status: true,
                                  data: data,
                                  visibility: visibilityDob,
                                });
                              }
                            }
                          );
                        } else if (monthdayvisiblity == "peopleyoufollow") {
                          database.query(
                            `select followingid from follow where followerid =${friendId} AND followingid = ${req.user.user_id}`,
                            (err, results) => {
                              if (!results.rows.length) {
                                visibilityDob = false;
                                res.status(200).json({
                                  status: true,
                                  data: data,
                                  visibility: visibilityDob,
                                });
                              } else {
                                res.status(200).json({
                                  status: true,
                                  data: data,
                                  visibility: visibilityDob,
                                });
                              }
                            }
                          );
                        } else if (monthdayvisiblity == "youfolloweachother") {
                          database.query(
                            `SELECT 1 FROM follow AS f1 WHERE f1.followerid = ${friendId} AND f1.followingid = ${req.user.user_id}AND EXISTS (SELECT 1 FROM follow AS f2 WHERE f2.followerid = ${req.user.user_id} AND f2.followingid = ${friendId});`,
                            (err, results) => {
                              if (!results.rows.length) {
                                visibilityDob = false;
                                res.status(200).json({
                                  status: true,
                                  data: data,
                                  visibility: visibilityDob,
                                });
                              } else {
                                res.status(200).json({
                                  status: true,
                                  data: data,
                                  visibility: visibilityDob,
                                });
                              }
                            }
                          );
                        } else if (monthdayvisiblity == "public") {
                          res.status(200).json({
                            status: true,
                            data: data,
                            visibility: true,
                          });
                        } else {
                          res.status(200).json({
                            status: true,
                            data: data,
                            visibility: false,
                          });
                        }
                        // console.log("happkddwsnekny");
                      }
                    );
                    // console.log("happy");
                  }
                }
              );
            else {
              res
                .status(400)
                .json({ status: false, message: "No FriendId Available" });
            }
          }
        }
      );
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const friendYearVisibility = async (req, res) => {
  try {
    let friendUserName = req.body.friendUserName;
    if (friendUserName) {
      await database.query(
        "SELECT ua.id FROM UserAccount ua WHERE ua.username = $1;",
        [friendUserName],
        async (err, results) => {
          if (err) res.status(400).json({ status: false, message: err });
          else {
            let friendId = results.rows[0].id;
            await database.query(
              "SELECT ua.id,ua.name,ua.username,ua.profilepicture_url,ua.header,ua.bio,ua.website,ua.verified,ua.createdat,ua.gender,ua.location,ua.birthdate,(SELECT COUNT(userid) FROM tweets WHERE userid = $1) AS tweet_count,(SELECT COUNT(followingid) FROM follow WHERE followerid = $1) AS following_count,(SELECT COUNT(followerid) FROM follow WHERE followingid = $1) AS follower_count FROM UserAccount ua WHERE ua.id = $1;",
              [friendId],
              async (err, results) => {
                if (err) res.status(400).json({ status: false, message: err });
                else {
                  let data = results.rows[0];

                  let visibilityDob = true;
                  // console.log("sad1qqqq9rdywi3y");
                  await database.query(
                    `Select * from dobvisiblity where userid =${friendId}`,
                    async (err, results) => {
                      const { yearvisiblity } = results.rows[0];
                      if (yearvisiblity == "yourfollowers") {
                        // console.log("sad1qqqq");
                        database.query(
                          `select followerid from follow where followingid =${friendId} AND followerid = ${req.user.user_id}`,
                          (err, results) => {
                            if (!results.rows.length) {
                              console.log("sad1");
                              visibilityDob = false;
                              res.status(200).json({
                                status: true,
                                yearVisibility: visibilityDob,
                              });
                            } else {
                              res.status(200).json({
                                status: true,
                                yearVisibility: visibilityDob,
                              });
                            }
                          }
                        );
                      } else if (yearvisiblity == "peopleyoufollow") {
                        database.query(
                          `select followingid from follow where followerid =${friendId} AND followingid = ${req.user.user_id}`,
                          (err, results) => {
                            if (!results.rows.length) {
                              console.log("sad2");
                              visibilityDob = false;
                              res.status(200).json({
                                status: true,
                                yearVisibility: visibilityDob,
                              });
                            } else {
                              res.status(200).json({
                                status: true,
                                yearVisibility: visibilityDob,
                              });
                            }
                          }
                        );
                      } else if (yearvisiblity == "youfolloweachother") {
                        database.query(
                          `SELECT 1 FROM follow AS f1 WHERE f1.followerid = ${friendId} AND f1.followingid = ${req.user.user_id}AND EXISTS (SELECT 1 FROM follow AS f2 WHERE f2.followerid = ${req.user.user_id} AND f2.followingid = ${friendId});`,
                          (err, results) => {
                            if (!results.rows.length) {
                              console.log("sad3");
                              visibilityDob = false;
                              res.status(200).json({
                                status: true,
                                yearVisibility: visibilityDob,
                              });
                            } else {
                              res.status(200).json({
                                status: true,
                                yearVisibility: visibilityDob,
                              });
                            }
                          }
                        );
                      } else if (yearvisiblity == "public") {
                        res.status(200).json({
                          status: true,
                          yearVisibility: true,
                        });
                      } else {
                        res.status(200).json({
                          status: true,
                          yearVisibility: false,
                        });
                      }
                      // console.log("happkddwsnekny");
                    }
                  );
                  // console.log("happy");
                }
              }
            );
          }
        }
      );
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const update_profile_content = async (req, res) => {
  // console.log("hi");
  try {
    // console.log(req);
    const name = req.body.name;
    let birthDateNew;
    const header = req.body.header;
    // if (!header) header = null;
    const bio = req.body.bio;
    const location = req.body.location;
    const website = req.body.website;
    let birthDate = req.body.birthDate;
    let str = req.body.monthDayVisibility;
    let str2 = req.body.yearVisibility;
    let result = str.replace(/\s/g, "");
    const monthDayVisibility = result;
    result = str2.replace(/\s/g, "");
    const yearVisibility = result;
    if (birthDate) {
      const date = new Date(birthDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      birthDate = `${day}-${month}-${year}`;
      // console.log(birthDate);
    } else {
      birthDate = `null`;
    }
    database.query(
      `BEGIN; update useraccount set name = '${name}', header = '${header}', bio='${bio}',location='${location}',website='${website}',birthdate= '${birthDate}' where id = ${req.user.user_id}; UPDATE dobvisiblity SET monthdayvisiblity = '${monthDayVisibility}',yearvisiblity='${yearVisibility}' where userid = ${req.user.user_id};commit;`,
      // "BEGIN; update useraccount set header = $1,bio=$2,location=$3,website=$4,birthdate=$5 where id = $6; UPDATE dobvisiblity SET monthdayvisiblity = $7,yearvisiblity=$8 where userid = $9;commit;",
      // [
      // header,
      // bio,
      // location,
      // website,
      // birthDate,
      // req.user.user_id,
      // monthDayVisiblity,
      // yearVisiblity,
      // req.user.user_id,
      // ],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else res.status(200).json({ status: true, message: "Profile Updated" });
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err, console: "outside" });
  }
};

const remove_profile_pic = async (req, res) => {
  try {
    database.query(
      "update UserAccount set profilepicture_url=$1 where id = $2",
      [null, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          res
            .status(200)
            .json({ status: false, message: "Profile Picture Not Removed" });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const remove_header_pic = async (req, res) => {
  try {
    database.query(
      "update UserAccount set header=$1 where id = $2",
      [null, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results) {
            res
              .status(200)
              .json({ status: true, message: "Header Picture Removed" });
          } else {
            res
              .status(200)
              .json({ status: false, message: "Header Picture Not Removed" });
          }
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const remove_dob = (req, res) => {
  // console.log("hi");
  try {
    database.query(
      "update UserAccount set birthdate=$1 where id = $2",
      [null, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          res
            .status(200)
            .json({ status: true, message: "DateofBirth Removed" });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = {
  userProfile,
  friendProfile,
  friendYearVisibility,
  remove_profile_pic,
  remove_header_pic,
  remove_dob,
  update_profile_content,
  upload,
};
