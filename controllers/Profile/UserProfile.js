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
        database.query(
          "update UserAccount set profilepicture_url=$1 where id = $2",
          [url.secure_url, req.user.user_id],
          (err, results) => {
            if (err) res.status(400).json({ status: false, message: err });
            else if (results) {
              res
                .status(200)
                .json({ status: true, message: "Profile Picture Updated" });
            }
          }
        );
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

const profile = async (req, res) => {
  try {
    await database.query(
      "select id,name,username,email,phonenumber,profilepicture_url,bio,website,verified,createdat,gender from UserAccount where id = $1",
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

// const update_profile_pic = async (req, res) => {
//   const pic = req.body.profilepicture;
// };

const remove_profile_pic = async (req, res) => {
  try {
    database.query(
      "update UserAccount set profilepicture_url=$1 where id = $2",
      [null, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results) {
            res
              .status(200)
              .json({ status: true, message: "Profile Picture Removed" });
          } else {
            res
              .status(200)
              .json({ status: false, message: "Profile Picture Not Removed" });
          }
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
  try {
    database.query(
      "update UserAccount set profilepicture_url=$1 where id = $2",
      [null, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results) {
            res
              .status(200)
              .json({ status: true, message: "DateofBirth Removed" });
          } else {
            res
              .status(200)
              .json({ status: false, message: "DateofBirth Not Removed" });
          }
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

const update_profile_content = async (req, res) => {
  try {
    const name = req.body.name;
    const header = req.body.header;
    const bio = req.body.bio;
    const location = req.body.location;
    const website = req.body.website;
    database.query(
      "update UserAccount set (header,bio,location,website) values ($1,$2,$3,$4) where id = $2",
      [null, req.user.user_id],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results) {
            res.status(200).json({ status: true, message: "Profile Updated" });
          } else {
            res
              .status(200)
              .json({ status: false, message: "Profile Not Updated" });
          }
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = {
  profile,
  // update_profile_pic,
  remove_profile_pic,
  remove_header_pic,
  remove_dob,
  update_profile_content,
  upload,
};