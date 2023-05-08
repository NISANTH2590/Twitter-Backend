// const socket = io("http://localhost:3000");

// socket.on("connect", () => {
//   console.log("hello");
// });

const database = require("../../db.config");
const addmessage = async (req, res) => {
  try {
    const body = req.body;
    database.query(
      "insert into messages (userid,replyuserid,messagecontent,createdat) values ($1,$2,$3,NOW())",
      [req.user.user_id, body.replyuserid, body.messagecontent],
      (err, results) => {
        if (err) res.status(400).json({ status: false, message: err });
        else {
          if (results)
            res.status(200).json({ status: true, message: "Message added" });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

// const displaymessages = async (req, res) => {
//   // let limit = req.body.limit;
//   let arr = [];
//   let limit = 2;
//   let offset = req.body.offset * limit;
//   database.query(
//     "select distinct replyuserid from messages",
//     (err, results) => {
//       if (err) throw err;
//       if (results.rows.length) {
//         for (let i = 0; i < results.rows.length; i++) {
//           database.query(
//             "select * from messages where replyuserid = $1 order by createdat desc",
//             [results.rows[i].replyuserid],
//             // , limit, offset],
//             (err, result) => {
//               if (err) throw err;
//               if (result.rows.length) {
//                 arr.push(result.rows[0]);
//                 // console.log(result.rows[0]);
//               }
//             }
//           );
//         }
//         res.status(200).json(arr);
//       } else res.status(400).json("Message not added");
//     }
//   );
// };

const displayusermessages = async (req, res) => {
  let replyuserid = req.body.replyuserid;
  let limit = req.body.limit;
  let offset = req.body.offset * limit;
  if (replyuserid) {
    database.query(
      "select messagecontent from messages where replyuserid = $1 limit $2 offset $3",
      [replyuserid, limit, offset],
      (err, results) => {
        if (err) throw err;
        if (results.rows.length) {
          res.status(200).json({ status: true, data: results.rows });
        } else
          res
            .status(400)
            .json({ status: false, message: "No messages available" });
      }
    );
  }
};

module.exports = { addmessage, displayusermessages };
