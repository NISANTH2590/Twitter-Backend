// const express = require("express");
// const router = express.Router();
const elastic = require("elasticsearch");
const bodyParser = require("body-parser");

const elasticClient = elastic.Client({
  host: "localhost:9200",
});

async function searchnames(name) {
  await elasticClient.search({ name });
  console.log("Searched names are :", `${name}`);
}

function checkConnection() {
  return new Promise(async (resolve) => {
    console.log("Checking connection to ElasticSearch...");
    let isConnected = false;
    while (!isConnected) {
      try {
        await elasticClient.cluster.health({});
        console.log("Successfully connected to ElasticSearch");
        isConnected = true;
        // eslint-disable-next-line no-empty
      } catch (_) {}
    }
    resolve(true);
  });
}

// checkConnection();

const search =
  (bodyParser,
  async (req, res) => {
    try {
      // const term = req.body.searchterm;
      const value = req.body.value;
      const tweetid = req.body.tweetid;
      const response = await elasticClient
        .search({
          timeout: "2s",
          index: "tweets",
          body: {
            query: {
              match: {
                // userid: value,
                tweetid: tweetid,
              },
            },
          },
        })
        .then((resp) => {
          res.status(200).json(resp.hits.hits);
          // return res.status(200).json({
        });
      // The response variable now contains the search results

      // let query = { index: "tweets" };
      // if (req.query.tweets) query.q = "userid:25";
      // elasticClient
      //   .search(query)
      //   .then((resp) => {
      //     return res.status(200).json({
      //       resp,
      //     });
      //   })
      //   .catch((err) => {
      //     return res.status(500).json({
      //       msg: "Error",
      //       err,
      //     });
    } catch (err) {
      res.status(400).json(err);
    }
  });

// for creating an index.
// elasticClient
//   .index({
//     index: "tweets",
//     body: req.body,
//   })
//   .then((resp) => {
//     return res.status(200).json({
//       msg: "product indexed",
//     });
//   })
//   .catch((err) => {
//     return res.status(500).json({
//       msg: "Error",
//       err,
//     });
//   });

//   let name = req.body.name;
//   if (name) {
//     searchnames(name);
//   }
//   database.query("select * from tweets", (err, results) => {
//     if (err) throw err;
//     if (results.rows.length) {
//       res.send(results.rows);98
//     }
//   });

// router.post("/products", bodyParser, (req, res) => {});

const post =
  (bodyParser,
  (req, res) => {
    try {
      const body = req.body;
      elasticClient
        .index({
          index: "tweets",
          body: body,
        })
        .then((resp) => {
          res.status(200).json(resp);
        });
    } catch (err) {
      res.status(400).json(err);
    }
  });

// delete operation is not working in elastic search need to figure it out.
// const deletetweet = (req, res) => {
//   elasticClient
//     .delete({
//       index: "tweets",
//       type: "_doc",
//       id: req.params.id,
//     })
//     .then((resp) => {
//       res.status(200).json(resp);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ error: "Internal server error" });
//     });
// };

// module.exports = { search, post, deletetweet };
module.exports = { search, post };
